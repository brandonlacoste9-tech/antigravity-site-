import { useState, useEffect } from "react";
import { BarChart2 } from "lucide-react";

interface PollProps {
  id: string;
  question: string;
  options: string[];
}

export function Poll({ id, question, options }: PollProps) {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState<number[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`poll-${id}`);
    if (saved) {
      setVoted(true);
    }
    
    // Simulate some initial votes for realistic look
    const initialVotes = options.map((_, i) => (i + 1) * 123 + (id.length * 10));
    setVotes(initialVotes);
    setTotalVotes(initialVotes.reduce((a, b) => a + b, 0));
  }, [id, options]);

  const handleVote = (index: number) => {
    if (voted) return;
    
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
    setTotalVotes(totalVotes + 1);
    setVoted(true);
    localStorage.setItem(`poll-${id}`, "true");
  };

  return (
    <div className="my-12 border-4 border-ink bg-background p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent">
        <BarChart2 className="h-4 w-4" />
        Sondage du lecteur
      </div>
      
      <h3 className="mt-4 font-serif text-2xl font-black leading-tight tracking-tighter">
        {question}
      </h3>

      <div className="mt-8 space-y-4">
        {options.map((option, i) => {
          const percentage = totalVotes > 0 ? Math.round((votes[i] / totalVotes) * 100) : 0;
          
          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              disabled={voted}
              className="group relative w-full text-left"
            >
              <div className="relative z-10 flex items-center justify-between border-2 border-ink bg-transparent px-4 py-3 transition-colors group-hover:bg-vox-yellow/10 disabled:cursor-default">
                <span className="font-bold">{option}</span>
                {voted && (
                  <span className="font-black uppercase tracking-widest">{percentage}%</span>
                )}
              </div>
              
              {voted && (
                <div 
                  className="absolute inset-0 z-0 bg-vox-yellow/30 transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {voted && (
        <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {totalVotes.toLocaleString()} votes enregistrés
        </p>
      )}
    </div>
  );
}
