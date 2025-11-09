# Complete Project Structure

## Directory Tree

```
fda-compliance-ai/
│
├── 📄 index.html                 # Vite entry point
├── 📦 package.json               # Dependencies
├── ⚙️  vite.config.js            # Vite config
├── 🎨 tailwind.config.js         # Tailwind config
├── 📮 postcss.config.js          # PostCSS config
│
└── 📁 src/
    ├── 📄 index.jsx              # React entry point
    ├── 📄 index.css              # Global styles
    ├── 📄 App.jsx                # Main app container
    │
    ├── 📁 components/            # Reusable components
    │   ├── Navbar.jsx            # Top navigation
    │   ├── Footer.jsx            # Bottom footer
    │   ├── FileUploadZone.jsx    # File upload with drag-drop
    │   ├── FeatureCard.jsx       # Feature display card
    │   ├── StatCard.jsx          # Statistics card
    │   ├── SectionCard.jsx       # Compliance section
    │   └── ChatWidget.jsx        # AI chatbot
    │
    ├── 📁 views/                 # Page-level components
    │   ├── UploadView.jsx        # File upload page
    │   ├── LoadingView.jsx       # Loading animation
    │   └── ResultsView.jsx       # Results display
    │
    └── 📁 utils/                 # Utilities & data
        ├── chatResponses.js      # Bot responses
        └── mockData.js           # Mock compliance data
```

## Component Hierarchy

```
App (State Manager)
├── Navbar
├── Main Content
│   ├── UploadView OR
│   ├── LoadingView OR
│   └── ResultsView
│       ├── StatCard (x4)
│       ├── Score Circle
│       ├── Executive Summary
│       └── SectionCard (x6)
├── ChatWidget (Fixed)
└── Footer
```

## File Sizes (Estimated)

```
components/
├── Navbar.jsx            ~0.5 KB
├── Footer.jsx            ~0.4 KB
├── FileUploadZone.jsx    ~2.5 KB
├── FeatureCard.jsx       ~0.4 KB
├── StatCard.jsx          ~0.6 KB
├── SectionCard.jsx       ~3.5 KB
└── ChatWidget.jsx        ~5.5 KB

views/
├── UploadView.jsx        ~2.5 KB
├── LoadingView.jsx       ~1.5 KB
└── ResultsView.jsx       ~4.5 KB

utils/
├── chatResponses.js      ~3.5 KB
└── mockData.js           ~2.5 KB

Other
├── App.jsx               ~1.5 KB
├── index.jsx             ~0.3 KB
└── index.css             ~2 KB

Total: ~36.7 KB (minified & gzipped: ~10 KB)
```

## Dependencies Tree

```
fda-compliance-ai/
├── react@18.2.0              (React core)
├── react-dom@18.2.0          (React DOM binding)
├── lucide-react@0.344.0      (Icon library)
│   └── (Contains 500+ SVG icons)
└── [Build Tools]
    ├── vite@5.0.8            (Build tool)
    ├── @vitejs/plugin-react  (React plugin)
    ├── tailwindcss@3.4.1     (CSS framework)
    ├── postcss@8.4.32        (CSS processor)
    └── autoprefixer@10.4.16  (CSS vendor prefixes)
```

## State Flow Diagram

```
App.jsx (Main State)
│
├─ view: 'upload' | 'loading' | 'results'
└─ selectedFile: File | null
    │
    ├─ 'upload' → UploadView
    │   └─ onAnalyze() → view='loading'
    │
    ├─ 'loading' → LoadingView
    │   └─ (After 4s) → view='results'
    │
    └─ 'results' → ResultsView
        ├─ onReset() → view='upload'
        ├─ ChatWidget (Independent)
        │   ├─ isOpen: boolean
        │   ├─ messages: []
        │   └─ input: string
        └─ SectionCard (Multiple)
            └─ expanded: boolean
```

## API Integration Points (For Backend)

```
Frontend                          Backend

UploadView
  └─ handleAnalyze()             → POST /api/analyze
     (File sent)                    └─ Process with Claude
                                    └─ Return analysis JSON
     │
     └─ ResultsView (Display results)

ChatWidget
  └─ handleSendMessage()          → POST /api/chat
     (User message sent)            └─ Process with OpenAI
                                    └─ Return bot response
     │
     └─ Display bot message
```

## Tailwind Classes Usage

```
Layout:
- max-w-7xl          (Max width container)
- mx-auto            (Center container)
- px-4               (Horizontal padding)
- py-12              (Vertical padding)
- grid grid-cols-*   (CSS Grid layouts)
- flex               (Flexbox layouts)

Colors:
- bg-white           (White backgrounds)
- bg-gradient-to-r from-purple-600 to-purple-800  (Gradients)
- text-gray-*        (Text colors)
- border-*           (Borders)

Sizing:
- w-* h-*            (Width/height)
- rounded-*          (Border radius)
- shadow-*           (Box shadows)

States:
- hover:             (Hover states)
- focus:             (Focus states)
- disabled:          (Disabled states)

Responsive:
- md:                (Tablet breakpoint)
- lg:                (Desktop breakpoint)
```

## Asset Requirements

```
✓ No external fonts needed (System fonts only)
✓ No image files needed (Lucide icons as SVG)
✓ No external CDN dependencies
✓ All CSS is utility-based (no separate stylesheets)
```
