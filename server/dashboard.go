package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
	"path"
	"fmt"
)

func dashboard(w http.ResponseWriter, r *http.Request) {
	ss := strings.Split(r.URL.Path, "/")
	if len(ss) < 3 {
		w.WriteHeader(400)
		return
	}

	u := "http://" + path.Join(ss[2] + "-chaos-grafana:3000", path.Join(ss[3:]...))
	url, err := url.Parse(u)
	if err != nil {
		w.WriteHeader(400)
		fmt.Fprintln(w, err)
		return
	}

	r.URL.Host = url.Host
	r.URL.Path = path.Join(ss[3:]...)
	r.Host = url.Host

	proxy := httputil.NewSingleHostReverseProxy(url)

	proxy.ServeHTTP(w, r)
}