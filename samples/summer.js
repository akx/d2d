var sums = {};
var mul = 1;
data
  .split("\n")
  .filter(Boolean)
  .map((l) => {
    if (l.startsWith("*")) {
      mul = parseFloat(l.substr(1));
    } else {
      (sums[mul] = sums[mul] || { mul, values: [] }).values.push(parseFloat(l));
    }
  });
var sumGroups = Object.values(sums).map(({ mul, values }) => ({
  mul,
  sum: values.reduce((acc, v) => acc + mul * v, 0),
}));
var sum = sumGroups.reduce((acc, v) => acc + v.sum, 0);
data = { sum, sumGroups };
