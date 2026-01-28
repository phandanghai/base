// rabbit.pattern.helper.ts
export function definePattern<P, R>() {
  return <
    T extends {
      pattern: string;
      queue?: string;
      description?: string;
    },
  >(
    def: T,
  ) =>
    def as T & {
      __payloadType?: P;
      __responseType?: R;
    };
}
