export default class FeedbackMessageFactory {
  public static requiredFeedbackFactory(fieldName: string, optionalMessage?: string): string {
    if (optionalMessage) return optionalMessage;

    return `Preencha o campo ${fieldName}, por favor`;
  }

  public static emailFeedbackFactory(optionalMessage?: string): string {
    if (optionalMessage) return optionalMessage;

    return 'Insira um e-mail válido, por favor';
  }
}
