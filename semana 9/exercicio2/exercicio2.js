const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");

celsius.addEventListener("input", function () {
  let c = parseFloat(celsius.value);
  let f = (c * 9) / 5 + 32;
  fahrenheit.value = f.toFixed(2);
});

fahrenheit.addEventListener("input", function () {
  let f = parseFloat(fahrenheit.value);
  let c = ((f - 32) * 5) / 9;

  celsius.value = c.toFixed(2);
});
