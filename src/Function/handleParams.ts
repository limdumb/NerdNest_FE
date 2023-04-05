export function handleParams(title: string) {
  const regex1 = /\s/g;
  const regex2 = /[`~!@#$%^&*|\\\'\";:\/?]/g;
  return title.replace(regex1, "-").replace(regex2, (match) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < match.length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  });
}
