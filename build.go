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
var header string = "./header.html.bp"
var footer string = "./footer.html.bp"
var postGen string = "./postgen.js.bp"

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

func getHeader() []byte {
	head, err := ioutil.ReadFile(header)
	if err != nil {
		panic(err)
	}

	return head
}

func getFooter() []byte {
	foot, err := ioutil.ReadFile(footer)
	if err != nil {
		panic(err)
	}

	return foot
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

func initHTML(path, t string) {
	dir := filepath.Join(rootDirName, t)
	file := "index.html"

	mkdir(dir)
	touch(dir, file)

	target := filepath.Join(dir, file)
	f := read(path)

	write(target, getHeader())
	write(target, encode64(f))
	write(target, getFooter())
}

func getJavascript() []byte {
	return read(postGen)
}

func initJavascript(path, t string) {
	dir := filepath.Join(rootDirName, t)
	file := "index.js"

	target := filepath.Join(dir, file)
	writeOnce(target, getJavascript())
}

func build(wg *sync.WaitGroup, path, target string) {
	initHTML(path, target)
	initJavascript(path, target)
	wg.Done()
}

func parsePath(path string) string {
	dir, file := filepath.Split(path)
	spl := strings.Split(dir, "/")[1:]
	joined := filepath.Join(spl...)
	return filepath.Join(joined, strings.TrimSuffix(file, ".md"))
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
