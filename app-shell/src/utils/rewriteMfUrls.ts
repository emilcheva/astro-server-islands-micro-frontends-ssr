export function rewriteMfUrls(html: string, base: string): string {
  return html
    .replace(/(src|href)="(\/?@[^"]+|\/src\/[^"]+|\/_astro\/[^"]+)"/g, `$1="${base}$2"`)
    .replace(/srcset="([^"]*)"/g, (_, s) =>
      `srcset="${s.replace(/(\/[^\s,"]+)/g, `${base}$1`)}"`
    );
}
