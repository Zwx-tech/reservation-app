import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractTags',
  standalone: true,
})
export class ExtractTagsPipe implements PipeTransform {
  transform(tagData: string): string[] {
    const tags = tagData.split(';');

    return tags.filter((tag) => !!tag);
  }
}
