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

type TagData struct {
	Name  string `json:"name"`
	Color string `json:"color"`
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
	r := regexp.MustCompile("# ([\\w+\\s가-힣:\\-{1}'\"][^\\-{3}])*")
	title := r.FindString(str)
	title = strings.TrimSuffix(title, "\n")
	title = strings.TrimPrefix(title, "# ")
	return title
}

func findTags(content []byte) []string {
	str := string(content)
	r, _ := regexp.Compile("### tags: (#[a-zA-Z가-힣0-9\\.:-{1}]+,?\\s?)*")
	tags := r.FindString(str)
	if len(tags) >= 9 {
		tags = tags[9:]
	}
	tags = strings.TrimSuffix(tags, "\n")
	return strings.Split(tags, ",")
}

func encode64(content []byte) []byte {
	s := base64.StdEncoding.EncodeToString(content)
	return []byte(s)
}

// gets .md file path inside _posts
// returns into category/${.md-filename}
// (ex)
// input: _posts/algorithm/***.md
// output: algorithm/***
func parsePath(path string) string {
	dir, file := filepath.Split(path)
	spl := strings.Split(dir, "/")[1:]
	joined := filepath.Join(spl...)
	return filepath.Join(joined, strings.TrimSuffix(file, ".md"))
}

// returns parent directory path
func parseParentDir(path string) string {
	dir, _ := filepath.Split(path)
	spl := strings.Split(dir, "/")[1:]
	return filepath.Join(spl...)
}

func writeHTML(markdown, p string, isDir bool) func() {
	return func() {
		name := "index.html"

		path := filepath.Join(rootDirName, p)
		mkdir(path)
		touch(path, name)

		target := filepath.Join(path, name)
		if isDir {
			target = filepath.Join(rootDirName, p, name)
		}
		writeOnce(target, read(header))
		if !isDir {
			f := read(markdown)
			write(target, encode64(f))
		}
		write(target, read(footer))
	}
}

func writeListHTML(file os.FileInfo, path string) {
	writeHTML(file.Name(), path, true)()
}

func writeJavascript(markdown, p string, isDir bool) func() {
	return func() {
		name := "index.js"

		path := filepath.Join(rootDirName, parsePath(markdown))
		mkdir(path)
		touch(path, name)

		target := filepath.Join(path, name)
		if isDir {
			target = filepath.Join(rootDirName, p, name)
		}
		if isDir {
			writeOnce(target, read(viewHeader))
			// import statement
			write(target, []byte(
				"import PostList from '/js/components/postList.js';",
			))
			write(target, read(viewBody))
			// instance declaration
			write(target, []byte(
				"new PostList(data, tags),",
			))
			write(target, read(viewFooter))
		} else {
			write(target, read(postGen))
		}
	}
}

func writeListJS(file os.FileInfo, p string) {
	path := filepath.Join(rootDirName, p)
	writeJavascript(path, p, true)()
}

func writeDataFile(markdown, path string) {
	dataFile := "data.js"
	file := filepath.Join(
		rootDirName, parseParentDir(markdown), dataFile,
	)
	f, err := os.OpenFile(file, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	writeOnce(file, []byte("export default ["))
	if err != nil {
		panic(err)
	}

	mdBody := read(markdown)

	e := json.NewEncoder(f)
	e.SetIndent("", "  ")
	_, url := filepath.Split(path)
	p := &PostData{
		Title: findTitle(mdBody),
		URL:   url,
		Icon:  "/icons/document.svg",
		Tags:  findTags(mdBody),
		ID:    0,
	}
	e.Encode(p)
	_, err = f.Write([]byte(","))
	if err != nil {
		panic(err)
	}
}

func writeTagFile(markdown, path string) {
	tagFile := "tag.js"
	file := filepath.Join(
		rootDirName, parseParentDir(markdown), tagFile,
	)
	f, err := os.OpenFile(file, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	writeOnce(file, []byte("export default ["))
	if err != nil {
		panic(err)
	}

	e := json.NewEncoder(f)
	e.SetIndent("", "  ")
	t := &TagData{
		Name:  "hi",
		Color: "#ffffff",
	}
	e.Encode(t)
	_, err = f.Write([]byte(","))
	if err != nil {
		panic(err)
	}
}

func build(wg *sync.WaitGroup, markdown, path string) {
	writeHTML(markdown, path, false)()
	writeJavascript(markdown, path, false)()
	writeDataFile(markdown, path)
	writeTagFile(markdown, path)
	defer wg.Done()
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
		target := parsePath(path)
		writeListHTML(info, target)
		writeListJS(info, target)
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
	} else if info.Name() == "tag.js" {
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
