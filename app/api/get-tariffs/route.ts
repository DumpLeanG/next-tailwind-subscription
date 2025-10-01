import { NextResponse } from 'next/server'
import type { Tariff } from '@/lib/types/tariff';

export async function GET() {
  try {
    const url = "https://t-core.fit-hub.pro/Test/GetTariffs";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Tariff[] = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data
    });
    
  } catch (error) {
    console.error('Error fetching tariffs:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Не удалось загрузить тарифы',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}