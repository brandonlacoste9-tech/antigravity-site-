import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
} from "recharts";

const COLORS = {
  accent: "var(--color-accent)",
  vox: "var(--vox-yellow)",
  ink: "var(--color-ink)",
  muted: "var(--color-muted-foreground)",
};

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
  subtitle?: string;
  source?: string;
}

export function BarChart({ data, xKey, yKey, title, subtitle, source }: ChartProps) {
  return (
    <div className="my-10 border-2 border-ink bg-snow p-6 md:p-8">
      {title && <h4 className="font-serif text-xl font-black uppercase tracking-tight">{title}</h4>}
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      
      <div className="mt-8 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey={xKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: COLORS.ink }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: COLORS.ink }}
            />
            <Tooltip 
              cursor={{ fill: "rgba(0,0,0,0.02)" }}
              contentStyle={{ 
                backgroundColor: "var(--color-ink)", 
                border: "none", 
                borderRadius: "0",
                color: "var(--vox-yellow)",
                fontSize: "12px",
                fontWeight: "900"
              }}
            />
            <Bar dataKey={yKey} fill={COLORS.accent} radius={[2, 2, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
      
      {source && (
        <div className="mt-6 border-t border-ink/10 pt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Source: {source}
        </div>
      )}
    </div>
  );
}

export function LineChart({ data, xKey, yKey, title, subtitle, source }: ChartProps) {
  return (
    <div className="my-10 border-2 border-ink bg-snow p-6 md:p-8">
      {title && <h4 className="font-serif text-xl font-black uppercase tracking-tight">{title}</h4>}
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      
      <div className="mt-8 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey={xKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: COLORS.ink }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: COLORS.ink }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--color-ink)", 
                border: "none", 
                borderRadius: "0",
                color: "var(--vox-yellow)",
                fontSize: "12px",
                fontWeight: "900"
              }}
            />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={COLORS.accent} 
              strokeWidth={4} 
              dot={{ r: 4, fill: COLORS.accent, strokeWidth: 2, stroke: "white" }} 
              activeDot={{ r: 6, fill: COLORS.ink }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
      
      {source && (
        <div className="mt-6 border-t border-ink/10 pt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Source: {source}
        </div>
      )}
    </div>
  );
}
