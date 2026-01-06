import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private apiKey = 'sk-ba0350ca6ccd4def8dc5c1316030b40c';
  private apiUrl = 'https://api.deepseek.com/chat/completions';

  constructor(private http: HttpClient) {}

  humanizeText(text: string): Observable<{ issues: string; improved: string }> {
    // Replace ß with ss
    const normalizedText = text.replace(/ß/g, 'ss');
    
    const prompt = `Analyze the following text and humanize it. First, briefly explain what sounds generic or robotic about it. Then, provide an improved, more natural and human-sounding version.

Text: "${normalizedText}"

Please respond in this exact format:
ISSUES: [explain what sounds generic/robotic]
IMPROVED: [provide the humanized version]`;

    const body = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    return this.http.post<any>(this.apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    }).pipe(
      map(response => {
        const content = response.choices[0].message.content;
        const issuesMatch = content.match(/ISSUES:\s*(.+?)(?=IMPROVED:|$)/s);
        const improvedMatch = content.match(/IMPROVED:\s*(.+?)$/s);

        return {
          issues: issuesMatch ? issuesMatch[1].trim() : 'Keine Probleme gefunden',
          improved: improvedMatch ? improvedMatch[1].trim() : content.trim()
        };
      })
    );
  }
}
