export async function fetchDamage(area) {
  const res = await fetch("/api/damage-analysis", {
    method: "POST",
    body: JSON.stringify(area),
  });

  return res.json();
}
