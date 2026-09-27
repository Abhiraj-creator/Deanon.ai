import { Card } from './Card';
import { BarChart2, Clock } from 'lucide-react';

/**
 * Mock Stylometric & Behavioral Analysis UI.
 * This component is purely visual – it shows placeholders for:
 *   • Writing‑style similarity (a simple side‑by‑side diff view)
 *   • Activity heat‑map (hour‑of‑day distribution)
 * The data is hard‑coded to keep the demo fully front‑end.
 */
export const StylometricAnalysis = () => {
  const similarity = 0.68; // 68% similarity mock value
  const heatMap = [
    2, 1, 0, 0, 3, 5, 8, 12, 15, 10, 7, 4, 3, 2, 1, 1, 0, 0, 0, 1, 2, 3, 4, 2,
  ]; // activity per hour

  return (
    <Card className="p-6">
      <h2 className="text-sm font-semibold text-text-primary mb-4">Stylometric &amp; Behavioral Analysis</h2>
      {/* Similarity bar */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <BarChart2 className="w-4 h-4 mr-2 text-text-secondary" />
          <span className="text-xs text-text-secondary">Writing‑style similarity</span>
        </div>
        <div className="w-full bg-border-subtle rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-accent-solid rounded-full"
            style={{ width: `${similarity * 100}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1">{Math.round(similarity * 100)}% match with known samples</p>
      </div>

      {/* Activity heat‑map */}
      <div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-2 text-text-secondary" />
          <span className="text-xs text-text-secondary">Hourly activity heat‑map (last 24h)</span>
        </div>
        <div className="grid grid-cols-12 gap-1">
          {heatMap.map((cnt, idx) => (
            <div
              key={idx}
              className={`h-4 rounded-sm ${cnt > 10 ? 'bg-status-green' : cnt > 5 ? 'bg-status-purple' : cnt > 0 ? 'bg-status-blue' : 'bg-border-subtle'}`}
              title={`Hour ${idx}: ${cnt} events`}
            />
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-1">Darker cells = more activity</p>
      </div>
    </Card>
  );
};
