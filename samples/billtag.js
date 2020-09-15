// Use "text lines" input.
// Each line should be `a,b,c value`
// where `value` gets divided equally for a, b and c
var sums = {};
data.map((l) => {
  let [people, value] = l.split(/\s+/g);
  value = parseFloat(value);
  people = people.split(",");
  people.forEach((p) =>
    (sums[p] = sums[p] || []).push(value / people.length),
  );
});
var totals = Object.fromEntries(
  Object.entries(sums).map(([p, n]) => [
    p,
    n.reduce((a, b) => a + b),
  ]),
);
data = { totals };
