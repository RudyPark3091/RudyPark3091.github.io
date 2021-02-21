package main

import (
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
)

var rootDirName string = os.Args[1]

var header string = "./blueprint/html/header.html.bp"
var footer string = "./blueprint/html/footer.html.bp"
var postGen string = "./blueprint/postgen.js.bp"

var viewHeader string = "./blueprint/view-header.js.bp"
var viewBody string = "./blueprint/view-body.js.bp"
var viewFooter string = "./blueprint/view-footer.js.bp"

type PostData struct {
	Title string   `json:"title"`
	URL   string   `json:"url"`
	Icon  string   `json:"icon"`
	Tags  []string `json:"tags"`
	ID    int      `json:"id"`
}

func mkdir(name string) {
	os.MkdirAll(name, 0777)
}

func touch(path, name string) {
	file, err := os.Create(filepath.Join(path, name))
	if err != nil {
		panic(err)
	}
	defer file.Close()
}

func read(path string) []byte {
	f, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	return f
}

func write(path string, content []byte) {
	f, err := os.OpenFile(
		path, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600,
	)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	_, err = f.Write(content)
	if err != nil {
		panic(err)
	}
}

func writeOnce(path string, content []byte) {
	f, err := os.OpenFile(
		path, os.O_WRONLY|os.O_CREATE, 0600,
	)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	_, err = f.Write(content)
	if err != nil {
		panic(err)
	}
}

func findTitle(content []byte) string {
	str := string(content)
	r, _ := regexp.Compile("# ([\\w+\\s가-힣:-{1}])*")
	title := r.FindString(str)
	title = strings.TrimSuffix(title, "\n")
	return title
}

func encode64(content []byte) []byte {
	s := base64.StdEncoding.EncodeToString(content)
	return []byte(s)
}

func parsePath(path string) string {
	dir, file := filepath.Split(path)
	spl := strings.Split(dir, "/")[1:]
	joined := filepath.Join(spl...)
	return filepath.Join(joined, strings.TrimSuffix(file, ".md"))
}

func parseParentDir(path string) string {
	dir, _ := filepath.Split(path)
	spl := strings.Split(dir, "/")[1:]
	return filepath.Join(spl...)
}

func writeHTML(markdown string, isDir bool) func() {
	return func() {
		name := "index.html"

		path := filepath.Join(rootDirName, parsePath(markdown))
		mkdir(path)
		touch(path, name)

		target := filepath.Join(path, name)
		writeOnce(target, read(header))
		if !isDir {
			f := read(markdown)
			write(target, encode64(f))
		}
		write(target, read(footer))
	}
}

func writeListHTML(file os.FileInfo) {
	writeHTML(file.Name(), true)()
}

func writeJavascript(markdown string, isDir bool) func() {
	return func() {
		name := "index.js"

		path := filepath.Join(rootDirName, parsePath(markdown))
		mkdir(path)
		touch(path, name)

		target := filepath.Join(path, name)
		if isDir {
			writeOnce(target, read(viewHeader))
			// import statement
			write(target, []byte(
				"import PostList from '/js/components/postList.js';",
			))
			write(target, read(viewBody))
			// instance declaration
			write(target, []byte(
				"new PostList(data),",
			))
			write(target, read(viewFooter))
		} else {
			write(target, read(postGen))
		}
	}
}

func writeListJS(file os.FileInfo) {
	writeJavascript(file.Name(), true)()
}

func encodeJSON() {}

func writeDataFile(markdown, path string) {
	dataFile := "data.js"
	file := filepath.Join(
		rootDirName, parseParentDir(markdown), dataFile,
	)
	// write(file, []byte(markdown+"\n"))
	p := &PostData{
		Title: markdown,
		URL:   markdown,
		Icon:  "/icons/document.svg",
		Tags:  []string{},
		ID:    0,
	}
	f, err := os.OpenFile(file, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	writeOnce(file, []byte("export default ["))
	if err != nil {
		panic(err)
	}

	e := json.NewEncoder(f)
	e.SetIndent("", "  ")
	e.Encode(p)
	_, err = f.Write([]byte(","))
	if err != nil {
		panic(err)
	}
}

func build(wg *sync.WaitGroup, markdown, path string) {
	writeHTML(markdown, false)()
	writeJavascript(markdown, false)()
	writeDataFile(markdown, path)
	defer wg.Done()
}

func touchDataFile(path string) {
	fileName := "data.js"
	touch(filepath.Join(rootDirName, path), fileName)
}

func walk(path string, info os.FileInfo, err error) error {
	wg := new(sync.WaitGroup)
	if err != nil {
		return err
	}
	if !info.IsDir() {
		target := parsePath(path)
		wg.Add(1)
		go build(wg, path, target)
	} else if info.Name() != "_posts" {
		writeListHTML(info)
		writeListJS(info)
		touchDataFile(info.Name())
	}
	wg.Wait()
	return nil
}

func closeBracket(path string, info os.FileInfo, err error) error {
	if err != nil {
		return err
	}

	if info.Name() == "data.js" {
		write(path, []byte("];"))
	}
	return nil
}

func main() {
	err := filepath.Walk("./_posts", walk)
	if err != nil {
		panic(err)
	}

	err = filepath.Walk(rootDirName, closeBracket)
	if err != nil {
		panic(err)
	}
}
