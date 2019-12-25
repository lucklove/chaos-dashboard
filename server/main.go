package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.PathPrefix("/dashboard/").HandlerFunc(dashboard)
	r.PathPrefix("/").Handler(web("/", "/web"))

	http.ListenAndServe("0.0.0.0:80", r)
}