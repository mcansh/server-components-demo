declare module 'excerpts' {
  function excerpts(
    html: string,
    opts: {
      append?: string;
      words?: number;
      characters?: number;
    }
  ): string;

  export default excerpts;
}
