import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'sk-your-key-here') {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const whisperForm = new FormData();
    whisperForm.append('file', audioFile, 'audio.webm');
    whisperForm.append('model', 'whisper-1');

    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: whisperForm,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Whisper error:', err);
      return NextResponse.json(
        { error: 'Transcription service unavailable' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text ?? '' });
  } catch (error) {
    console.error('Whisper route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
