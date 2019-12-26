package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
	"path"
	"fmt"
	"os"
)

func api(w http.ResponseWriter, r *http.Request) {
	ss := strings.Split(r.URL.Path, "/")
	if len(ss) < 2 {
		w.WriteHeader(400)
		return
	}

	u := "http://" + path.Join(os.Getenv("CHAOS_API_HOST"), path.Join(ss[2:]...))
	url, err := url.Parse(u)
	if err != nil {
		w.WriteHeader(400)
		fmt.Fprintln(w, err)
		return
	}

	r.URL.Host = url.Host
	r.URL.Path = path.Join(ss[2:]...)
	r.Host = url.Host

	proxy := httputil.NewSingleHostReverseProxy(url)

	proxy.ServeHTTP(w, r)
}