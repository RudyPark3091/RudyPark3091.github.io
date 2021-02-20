package main

import (
	"encoding/base64"
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
				"new PostList(),",
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

func build(wg *sync.WaitGroup, markdown, path string) {
	writeHTML(markdown, false)()
	writeJavascript(markdown, false)()
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
		writeListHTML(info)
		writeListJS(info)
	}
	wg.Wait()
	return nil
}

func main() {
	err := filepath.Walk("./_posts", walk)
	if err != nil {
		panic(err)
	}
}
