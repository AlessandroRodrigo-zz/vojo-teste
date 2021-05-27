export default class InputFeedbackMessageFactory {
  public static requiredFeedbackFactory(fieldName: string, optionalMessage?: string): string {
    if (optionalMessage) return optionalMessage;

    return `Preencha o campo ${fieldName}, por favor`;
  }

  public static emailFeedbackFactory(optionalMessage?: string): string {
    if (optionalMessage) return optionalMessage;

    return 'Insira um e-mail válido, por favor';
  }

  public static minCharacters(minValue: number, optionalMessage?: string): string {
    if (optionalMessage) return optionalMessage;

    return `Esse campo deve ter no mínimo ${minValue} caracteres`;
  }
}
