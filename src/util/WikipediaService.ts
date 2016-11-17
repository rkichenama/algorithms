import { FetchService } from './FetchService';

export class WikipediaService extends FetchService {

  pull (title: string): Promise<any> {
    return super.pull(`https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${title.replace(/ /g, '_')}&callback=?&origin=*`)
      .then((text) => JSON.parse(
        text.toString()
          .replace(/^\/\*\*\//, '')
          .replace(/^\(/, '')
          .replace(/\)$/, '')
      ))
      .then((json) => json.parse)
      ;
  }

  pullID (pageid: number): Promise<any> {
    return super.pull(`https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&pageid=${pageid}&callback=?&origin=*`)
      .then((text) => JSON.parse(
        text.toString()
          .replace(/^\/\*\*\//, '')
          .replace(/^\(/, '')
          .replace(/\)$/, '')
      ))
      .then((json) => json.parse)
      ;
  }

};
  /*
https://en.wikipedia.org/w/api.php?action=help&modules=parse
      $.ajax({
          type: "GET",
          url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function (data, textStatus, jqXHR) {

              var markup = data.parse.text["*"];
              var blurb = $('<div></div>').html(markup);
              $('#article').html($(blurb).find('p'));

          },
          error: function (errorMessage) {
          }
      });


      (new FetchService()).pull('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Insertion_sort&callback=?&origin=*')
        .then((text) => text.toString()
          .replace(/^\/\*\*\//, '')
          .replace(/^\(/, '')
          .replace(/\)$/, '')
        )
        .then((text) => JSON.parse(text))
        .then((i) => console.dir(i));

   */
