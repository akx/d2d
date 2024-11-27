export interface TemRule {
  match: string;
  replace: string;
}

export interface TemState {
  rules: TemRule[];
}
