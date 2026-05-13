//frontend/src/pages/ReadConstitution.jsx
import React, { useState } from 'react';
import { 
  Shield, 
  BookOpen, 
  Users, 
  Scale, 
  Gavel, 
  Landmark, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Star,
  RefreshCw,
  Info,
  Book,
  AlertTriangle
} from 'lucide-react';

// --- DATA & CONTENT ---

const CHAPTER_DATA = {
  title: "Chapter One: Sovereignty & Supremacy",
  articles: [
    {
      id: 1,
      title: "Sovereignty of the People",
      simplified: "All power belongs to YOU (the people). You lend it to the leaders, but you remain the boss.",
      text: "All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.",
      breakdown: [
        "Power belongs to Wanjiku (the people).",
        "It is exercised directly (voting/referendum) or indirectly (representatives).",
        "Power is delegated to: Parliament, Executive, and Judiciary."
      ]
    },
    {
      id: 2,
      title: "Supremacy of this Constitution",
      simplified: "The Constitution is the Supreme Leader. No person or law is above it.",
      text: "This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.",
      breakdown: [
        "It is the 'Supreme Law'.",
        "Any law that goes against it is VOID (invalid).",
        "No custom or tradition can break the Constitution."
      ]
    },
    {
      id: 3,
      title: "Defence of this Constitution",
      simplified: "It is your duty to protect this book. Illegal takeovers are not allowed.",
      text: "Every person has an obligation to respect, uphold and defend this Constitution.",
      breakdown: [
        "Every person must defend it.",
        "Establishing a government illegally (coup) is unlawful."
      ]
    }
  ]
};

// --- KIDS COMPONENT: "THE GUARDIAN'S QUEST" ---

const KidsMode = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const scenarios = [
    {
      story: "The Village Chief announces: 'I am now the Supreme Ruler! I can make any rule I want, even if the Constitution says no!'",
      villain: "The Power-Hungry Chief",
      question: "What do you do?",
      options: [
        { text: "Agree with him because he is strong.", correct: false, response: "Oh no! Article 2 says the Constitution is Supreme, not the Chief!" },
        { text: "Use the 'Supremacy Shield' (Article 2)!", correct: true, response: "Correct! No person is above the Constitution." }
      ]
    },
    {
      story: "A stranger comes to town and tries to start a new government by force, ignoring the elections.",
      villain: "The Coup Plotter",
      question: "Which power defends the village?",
      options: [
        { text: "Article 3: We have a duty to Defend the Constitution.", correct: true, response: "Great job! We must respect and defend the law." },
        { text: "Hide and hope they go away.", correct: false, response: "Article 3 says every person has an obligation to defend the Constitution!" }
      ]
    },
    {
      story: "The Parliament passes a law that says 'Blue cars are illegal', but the Constitution says 'You can own property'.",
      villain: "The Bad Law",
      question: "Is the new law valid?",
      options: [
        { text: "Yes, Parliament is powerful.", correct: false, response: "Wrong. Article 2 says any law inconsistent with the Constitution is VOID." },
        { text: "No! It is VOID because it breaks the Constitution.", correct: true, response: "Exactamundo! The Constitution wins every time." }
      ]
    }
  ];

  const handleAnswer = (isCorrect, response) => {
    setFeedback({ isCorrect, response });
    if (isCorrect) setScore(score + 1);
  };

  const nextScenario = () => {
    setFeedback(null);
    setStep(step + 1);
  };

  const resetGame = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
  };

  if (step >= scenarios.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-xl border-4 border-green-200 text-center animate-fade-in">
        <Star className="w-16 h-16 text-yellow-500 mb-4 fill-current animate-bounce" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">Quest Complete!</h2>
        <p className="text-lg text-green-700 mb-6">You scored {score} out of {scenarios.length}. You are a true Defender of the Constitution!</p>
        <button onClick={resetGame} className="px-6 py-3 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition">
          Play Again
        </button>
      </div>
    );
  }

  const currentScenario = scenarios[step];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Game Header */}
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <span className="font-bold text-lg">Guardian Level 1</span>
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < score ? 'fill-yellow-300 text-yellow-300' : 'text-blue-300'}`} />
          ))}
        </div>
      </div>

      {/* Game Stage */}
      <div className="p-6 md:p-8">
        <div className="mb-6 bg-blue-50 p-6 rounded-2xl border border-blue-100 relative">
          <span className="absolute -top-3 left-6 bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider">Mission {step + 1}</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{currentScenario.villain}</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{currentScenario.story}</p>
        </div>

        {!feedback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentScenario.options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(opt.correct, opt.response)}
                className="p-6 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <span className="font-bold text-gray-800 group-hover:text-blue-700 block mb-1">Option {idx + 1}</span>
                <span className="text-gray-600">{opt.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={`p-6 rounded-xl text-center ${feedback.isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
            <div className="flex justify-center mb-3">
              {feedback.isCorrect ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
            </div>
            <h4 className={`text-xl font-bold mb-2 ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.isCorrect ? 'Awesome!' : 'Not quite...'}
            </h4>
            <p className="text-gray-800 mb-6">{feedback.response}</p>
            <button 
              onClick={nextScenario}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              Next Mission <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- LEARNERS COMPONENT: "INTERACTIVE FLOWS" ---

const LearnersMode = () => {
  const [lawText, setLawText] = useState("");
  const [checkResult, setCheckResult] = useState(null);

  const checkLaw = () => {
    if (!lawText) return;
    // Simple logic simulation for the demo
    setCheckResult({
      status: "VOID",
      message: "This law conflicts with Article 2(4). The Constitution is Supreme.",
      article: "Article 2(4)"
    });
  };

  return (
    <div className="space-y-8">
      {/* Visualizer 1: The Flow of Power */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-blue-600" /> Where does Power come from? (Article 1)
        </h3>
        
        <div className="relative pt-8 pb-4 px-4 bg-gray-50 rounded-lg">
          {/* Top Level */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="bg-yellow-400 p-4 rounded-full shadow-lg text-center w-48 border-4 border-yellow-200">
              <span className="block font-black text-gray-900 text-lg">THE PEOPLE</span>
              <span className="text-xs font-bold uppercase text-gray-800">(Sovereign Power)</span>
            </div>
          </div>

          {/* Arrows */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-300"></div>
          <div className="absolute top-32 left-1/4 right-1/4 h-0.5 bg-gray-300"></div>
          <div className="absolute top-32 left-1/4 w-0.5 h-8 bg-gray-300"></div>
          <div className="absolute top-32 right-1/4 w-0.5 h-8 bg-gray-300"></div>

          {/* Second Level */}
          <div className="flex justify-around mb-8 text-sm">
            <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-center w-32">
              <span className="block font-bold text-blue-600">Directly</span>
              <span className="text-xs text-gray-500">Voting, Referenda</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-center w-32">
              <span className="block font-bold text-blue-600">Indirectly</span>
              <span className="text-xs text-gray-500">Representatives</span>
            </div>
          </div>

          {/* Third Level */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8">
            {[
              { title: "Parliament", icon: Users, desc: "Makes Laws" },
              { title: "Executive", icon: Star, desc: "Implements Laws" },
              { title: "Judiciary", icon: Scale, desc: "Interprets Laws" }
            ].map((organ, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-blue-500 text-center">
                <organ.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <h4 className="font-bold text-gray-800">{organ.title}</h4>
                <p className="text-xs text-gray-500">{organ.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visualizer 2: The Void Stamp (Article 2) */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Gavel className="text-red-600" /> The Supremacy Test (Article 2)
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Article 2(4) says any law inconsistent with the Constitution is <strong>VOID</strong>. Try it out:
        </p>

        <div className="bg-stone-100 p-6 rounded-lg border-2 border-stone-200 relative overflow-hidden">
          <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Draft a fake law:</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={lawText}
              onChange={(e) => {setLawText(e.target.value); setCheckResult(null);}}
              placeholder="e.g., 'The President can rule forever'"
              className="flex-1 p-3 rounded border border-stone-300 font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button 
              onClick={checkLaw}
              disabled={!lawText}
              className="bg-gray-800 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 disabled:opacity-50"
            >
              TEST
            </button>
          </div>

          {checkResult && (
            <div className="mt-6 flex flex-col items-center animate-bounce-in">
              <div className="border-4 border-red-600 text-red-600 font-black text-4xl p-4 rounded-lg transform -rotate-12 opacity-80" style={{borderStyle: 'double'}}>
                VOID
              </div>
              <p className="mt-4 text-red-700 font-medium bg-red-50 px-4 py-2 rounded text-center">
                {checkResult.message} <br/>
                <span className="text-xs font-bold uppercase tracking-widest">{checkResult.article}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ADVANCED COMPONENT: "DEEP DIVE" ---

const AdvancedMode = () => {
  const [activeNote, setActiveNote] = useState(null);

  const annotations = {
    "sovereign": "Refers to the ultimate authority in decision-making process of the state and in the maintenance of order.",
    "delegated": "The people do not govern directly in day-to-day matters but transfer this authority to state organs. However, the people retain the right to recall this power.",
    "supremacy": "This is the 'Grundnorm' or basic norm. It implies that the Constitution is the source of all other legal validity.",
    "void": "Ab initio (from the beginning). The law is treated as if it never existed.",
    "customary law": "Traditional practices of communities. These are allowed ONLY if they do not clash with the Constitution (e.g., repugnant practices like FGM are void)."
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Text Column */}
      <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-200 font-serif leading-relaxed">
        <h3 className="font-sans font-bold text-2xl text-gray-900 mb-6 border-b pb-4">Chapter One</h3>
        
        <div className="mb-8">
          <h4 className="font-sans font-bold text-lg text-blue-800 mb-2">1. Sovereignty of the people</h4>
          <p className="mb-4">
            (1) All <span className="cursor-pointer text-blue-600 font-medium underline decoration-dotted" onClick={() => setActiveNote('sovereign')}>sovereign power</span> belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.
          </p>
          <p className="mb-4">
            (2) The people may exercise their sovereign power either directly or through their democratically elected representatives.
          </p>
          <p className="mb-4">
            (3) Sovereign power under this Constitution is <span className="cursor-pointer text-blue-600 font-medium underline decoration-dotted" onClick={() => setActiveNote('delegated')}>delegated</span> to the following State organs...
          </p>
        </div>

        <div className="mb-8">
          <h4 className="font-sans font-bold text-lg text-blue-800 mb-2">2. Supremacy of this Constitution</h4>
          <p className="mb-4">
            (1) This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.
          </p>
          <p className="mb-4">
            (4) Any law, including <span className="cursor-pointer text-blue-600 font-medium underline decoration-dotted" onClick={() => setActiveNote('customary law')}>customary law</span>, that is inconsistent with this Constitution is <span className="cursor-pointer text-blue-600 font-medium underline decoration-dotted" onClick={() => setActiveNote('void')}>void</span> to the extent of the inconsistency...
          </p>
        </div>
      </div>

      {/* Annotation Sidebar */}
      <div className="w-full md:w-80 shrink-0">
        <div className="sticky top-6">
          <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Legal Commentary
            </h4>
            {activeNote ? (
              <div className="animate-fade-in">
                <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-2">{activeNote}</span>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {annotations[activeNote]}
                </p>
                <button 
                  onClick={() => setActiveNote(null)}
                  className="mt-4 text-xs text-slate-400 hover:text-white underline"
                >
                  Clear selection
                </button>
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">
                Click on the <span className="text-blue-400 underline decoration-dotted">underlined words</span> in the text to see legal definitions and context.
              </p>
            )}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
             <h5 className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-2">
               <AlertTriangle className="w-4 h-4" /> Did you know?
             </h5>
             <p className="text-xs text-yellow-800">
               In the 2010 Constitution, the shift to Article 1 (Sovereignty) was a major change from the previous constitution, which focused more on Executive Power. It centers the citizen.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP SHELL ---

const ReadConstitution = () => {
  const [activeTab, setActiveTab] = useState('kids');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/*<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
             <span className="font-bold text-xl tracking-tight">Civic<span className="text-green-600">Hub</span></span> */}
          </div>
          <div className="hidden md:flex gap-4 text-sm font-medium text-gray-500">
            <a href="/public/The Constitution of Kenya.pdf" target="_blank" rel="noreferrer"><span className="text-green-600 font-bold">Download the Constitution (PDF)</span></a>
            <span className="hover:text-green-600 cursor-pointer">Join a Community</span>
            <span className="hover:text-green-600 cursor-pointer">Any Suggestions?</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Know Your Rights</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the Constitution of Kenya. Choose the level that suits you best.
          </p>
        </div>

        {/* Level Selector */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('kids')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${activeTab === 'kids' ? 'border-green-500 bg-green-50 text-green-800 ring-2 ring-green-200 ring-offset-2' : 'border-gray-200 bg-white hover:border-green-200'}`}
          >
            <div className="bg-green-100 p-2 rounded-lg">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Kids Level</span>
              <span className="text-xs text-gray-500">Stories & Games</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('learners')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${activeTab === 'learners' ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-200 ring-offset-2' : 'border-gray-200 bg-white hover:border-blue-200'}`}
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <Landmark className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Learners</span>
              <span className="text-xs text-gray-500">Visuals & Logic</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('advanced')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${activeTab === 'advanced' ? 'border-purple-500 bg-purple-50 text-purple-800 ring-2 ring-purple-200 ring-offset-2' : 'border-gray-200 bg-white hover:border-purple-200'}`}
          >
            <div className="bg-purple-100 p-2 rounded-lg">
              <Book className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Advanced</span>
              <span className="text-xs text-gray-500">Full Text & Notes</span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in-up">
          {activeTab === 'kids' && <KidsMode />}
          {activeTab === 'learners' && <LearnersMode />}
          {activeTab === 'advanced' && <AdvancedMode />}
        </div>

      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">CivicHub Prototype • Built for the People of Kenya</p>
          <div className="text-xs text-gray-600 max-w-lg mx-auto">
            Disclaimer: This is an educational tool. While based on the Constitution of Kenya (2010), 
            simplified versions are for learning purposes and should not be cited in court.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReadConstitution;