export default function(_search, name, bNotEscape) {
  if (!_search) return;
  var r = _search.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
  if (bNotEscape) {
    return (r == null ? null : r[2]);
  } else {
    return (r == null ? null : unescape(r[2]));
  }
}