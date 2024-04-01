import { CensorMailPipe } from './censor-mail.pipe';

describe('CenzorMailPipe', () => {
  it('create an instance', () => {
    const pipe = new CensorMailPipe();
    expect(pipe).toBeTruthy();
  });
});
