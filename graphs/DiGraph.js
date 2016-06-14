class DiGraph /*extends Graph*/ {
  /*
  create a V-vertex graph with no edges
  */
  constructor (V) {}
  // number of vertices
  V () {}
  // number of edges
  E () {}
  /*
  add edge v->w to digraph
  @param {object} v
  @param {object} w
  */
  addEdge (v, w) {}
  /*
  vertices adjacent to v
  @param {object} v
  */
  adj (v) {}
  // reverse the digraph
  reverse () {}
  toString () {}
};
