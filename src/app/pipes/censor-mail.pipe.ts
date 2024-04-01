import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'censorMail',
  standalone: true,
})
export class CensorMailPipe implements PipeTransform {
  //* We shouldn't leak user mails
  //* PS I just realized i should do this on the backend
  //* 'cause u can see all email in the request
  transform(email: string): unknown {
    if (!email) return null;

    // we want only to censor first email part
    const [username, domain] = email.split('@');
    const censoredUsername = username[0] + username.slice(1).replace(/./g, '*');

    return `${censoredUsername}@${domain}`;
  }
}
