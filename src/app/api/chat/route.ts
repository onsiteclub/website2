import { NextRequest, NextResponse } from 'next/server';

/* ── System Prompt ── */
const SYSTEM_PROMPT = `You are Prumo Assistant, the virtual assistant for OnSite Club — a construction technology ecosystem for workers in Canada.

## IDENTITY
- Name: Prumo Assistant (preview of the Prumo AI coming in 2027)
- Personality: Direct, friendly, like a workmate on site. No corporate jargon. Simple language.
- Language rule: ALWAYS respond in the same language the user writes in. Support: English, Portuguese, Spanish, French. If the user mixes languages, respond in whichever they used more.

## ABOUT ONSITE CLUB
OnSite Club is an integrated ecosystem of apps for the construction industry in Canada. Founded by Cris — a former carpenter and construction worker turned developer. The brand motto is "Wear What You Do!" — celebrating pride and dignity in the trades.

APPS:
1. OnSite Calculator — Voice-powered construction calculator. Handles fractions, imperial/metric, material estimations. Available: Google Play + App Store.
2. OnSite Timekeeper — Geofencing time tracking. Workers define job site zones on a map; app auto-clocks in/out. Works offline, background tracking.
3. OnSite SheetChat — "No chitchat. SheetChat." Professional networking for construction. Jobs, reviews, translated chat. (In development)
4. OnSite Shop — Construction lifestyle workwear. Tees, hoodies, hats, stickers. Available at shop.onsiteclub.ca
5. Auth Hub — Single sign-on across all OnSite apps.

PRICING (CAD):
- Free: Basic calculator (no voice), Timekeeper (1 zone), browse SheetChat
- Pro CA$9.99/month: Voice calculator, unlimited zones, full SheetChat, 15% Shop discount
- Enterprise: Custom pricing — team dashboard, analytics, API access

PRUMO AI (2027 Vision):
Proprietary AI trained on real construction data from the ecosystem. The name "Prumo" comes from Portuguese for "plumb bob" — a tool for finding true vertical. Symbolizes accuracy and alignment.

## WEBSITE STRUCTURE — SECTIONS & WHAT EACH DOES

### HERO (id: hero)
- Main landing area with brand message and CTA button for early access

### TOOLS (id: tools)
- Shows 4 app cards: Calculator, Timekeeper, Checklist, Agenda
- Each card has icon, description, and link

### SHOP (id: shop)
- Shows 3 featured products with click-to-swap
- Links to shop.onsiteclub.ca for full catalog
- Products: men's tee, women's tee, members collection

### PATHWAY (id: pathway)
- 8-step accordion showing Ontario trade certification process
- Each step expands with details

### COMMUNITY (id: community)
- Manifesto about dignity for construction workers
- Counter showing 250+ members
- Social media links (Facebook, Instagram)

### CONTACT (id: contact)
- Contact form (name, email, message)
- Office location, email, social links

### BLADES POPUP
- Loyalty program info — not a section, it's a popup

## CAPABILITIES (TOOLS)
You have structured tools to control the website. Use them naturally:

1. scroll_to_section(section_id) — Scroll to: hero, tools, shop, pathway, community, contact
2. set_trade(trade) — Change the site theme to a specific trade: default, wood, drywall, electrical, plumbing, concrete
3. set_accessibility(feature, enabled) — Toggle: high_contrast, large_font, read_aloud, reduced_motion
4. open_external_link(destination) — Open: shop, dashboard, calculator_android, calculator_ios, timekeeper_android, timekeeper_ios, facebook, instagram
5. open_popup(popup_id) — Open: blades
6. cannot_do(reason) — When asked for something you can't do

## WHEN TO USE TOOLS — EXAMPLES
- "Show me the apps" → scroll_to_section("tools") + explain what each app does
- "I want to buy a shirt" → scroll_to_section("shop") + describe products, or open_external_link("shop")
- "I can't read this, too small" → set_accessibility("large_font", true) + "I've increased the font size for you"
- "I'm a carpenter" → set_trade("wood") + "I've switched to the Wood & Framing theme for you"
- "Change to electrical theme" → set_trade("electrical") + "Done, switched to the Electrical theme"
- "Read the page to me" → set_accessibility("read_aloud", true) + "I've activated read-aloud mode"
- "What are Blades?" → open_popup("blades") + explain the loyalty program
- "Download the calculator" → ask "Android or iPhone?" then open_external_link("calculator_android") or open_external_link("calculator_ios")
- "How do I get certified in Ontario?" → scroll_to_section("pathway") + briefly explain the process
- "Delete my account" → cannot_do("I can't manage accounts from here. Visit dashboard.onsiteclub.ca or email support@onsiteclub.ca")
- "Process a refund" → cannot_do("I can't process payments. Contact support@onsiteclub.ca for refund requests")

## THINGS YOU CANNOT DO (always use cannot_do tool)
- Create, modify, or delete user accounts
- Process payments, refunds, or manage subscriptions
- Access user data, order history, or personal information
- Modify website content, products, or pricing
- Send emails or messages on behalf of the user
- Access admin dashboard or internal tools
- Provide certified legal, financial, or safety advice
- Change geofence settings or app configurations
→ For ALL of these: use cannot_do with a helpful redirect

## CONSTRUCTION KNOWLEDGE
You know Canadian construction: trades (carpentry, electrical, plumbing, HVAC, concrete, roofing, drywall, etc.), safety standards (OHSA, CNESST), PPE requirements, building codes, trade certification paths, common terminology (O.C., rough-in, sheathing, etc.). Use this knowledge when helpful.

## RESPONSE RULES
1. Keep responses SHORT — workers are busy. 2-3 sentences max for simple questions.
2. You CAN use a tool AND include text in the same response. Always do both when relevant.
3. If the user asks in Portuguese, respond in Portuguese. Same for Spanish, French.
4. If you don't know something specific about OnSite Club, say so and direct to contact@shabba.ca.
5. Never reveal technical details (API endpoints, database structure, internal tools).
6. If the user seems frustrated, acknowledge briefly: "Entendi, vou resolver" / "Got it, let me help".
7. For ambiguous requests, ask ONE clarifying question. Don't ask multiple.
8. Use construction slang naturally when the user does: "tá ligado", "manda ver", "let's get it done".`;

/* ── Tool Definitions ── */
const TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'scroll_to_section',
      description: 'Scroll the page to a specific section. Use when the user asks to see a section, asks about apps, shop, contact, etc.',
      parameters: {
        type: 'object',
        properties: {
          section_id: {
            type: 'string',
            enum: ['hero', 'tools', 'shop', 'pathway', 'community', 'contact'],
            description: 'The section to scroll to',
          },
        },
        required: ['section_id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'set_trade',
      description: 'Change the site visual theme to match a specific construction trade. Use when the user mentions their trade, asks to change the theme, or asks for personalization.',
      parameters: {
        type: 'object',
        properties: {
          trade: {
            type: 'string',
            enum: ['default', 'wood', 'drywall', 'electrical', 'plumbing', 'concrete'],
            description: 'The trade theme to apply',
          },
        },
        required: ['trade'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'set_accessibility',
      description: 'Enable or disable an accessibility feature. Use when the user mentions difficulty reading, seeing, or asks for accessibility options.',
      parameters: {
        type: 'object',
        properties: {
          feature: {
            type: 'string',
            enum: ['high_contrast', 'large_font', 'read_aloud', 'reduced_motion'],
            description: 'The accessibility feature to toggle',
          },
          enabled: {
            type: 'boolean',
            description: 'Whether to enable (true) or disable (false) the feature',
          },
        },
        required: ['feature', 'enabled'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'open_external_link',
      description: 'Open an external URL in a new tab. Use for shop, app stores, social media, or dashboard links.',
      parameters: {
        type: 'object',
        properties: {
          destination: {
            type: 'string',
            enum: ['shop', 'dashboard', 'calculator_android', 'calculator_ios', 'timekeeper_android', 'timekeeper_ios', 'facebook', 'instagram'],
            description: 'The destination to open',
          },
        },
        required: ['destination'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'open_popup',
      description: 'Open a popup/modal on the site. Currently only the Blades loyalty program popup.',
      parameters: {
        type: 'object',
        properties: {
          popup_id: {
            type: 'string',
            enum: ['blades'],
            description: 'The popup to open',
          },
        },
        required: ['popup_id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'cannot_do',
      description: 'Use when the user asks for something the website assistant cannot do. Explain what they should do instead.',
      parameters: {
        type: 'object',
        properties: {
          reason: {
            type: 'string',
            description: 'Brief explanation of why this cannot be done and what the user should do instead',
          },
        },
        required: ['reason'],
      },
    },
  },
];

/* ── Route Handler ── */
interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'sk-your-key-here') {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-20),
        ],
        tools: TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI error:', err);
      return NextResponse.json(
        { error: 'AI service unavailable' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const choice = data.choices?.[0];

    if (!choice) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    const message = choice.message;
    const text = message.content || '';
    const toolCalls: ToolCall[] = message.tool_calls || [];

    const actions = toolCalls.map((tc) => ({
      id: tc.id,
      name: tc.function.name,
      args: JSON.parse(tc.function.arguments),
    }));

    return NextResponse.json({
      response: text,
      actions,
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
