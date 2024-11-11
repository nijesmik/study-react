const aliases = new Map([["htmlFor", "for"]]);

export default function (name) {
  return aliases.get(name) || name;
}
