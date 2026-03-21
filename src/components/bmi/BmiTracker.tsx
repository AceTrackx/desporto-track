import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Scale, Plus, Trash2, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { useBmiRecords, useCreateBmiRecord, useDeleteBmiRecord } from "@/hooks/useBmiRecords";
import { toast } from "sonner";

interface BmiTrackerProps {
  playerId: string;
  playerName?: string;
  canDelete?: boolean;
}

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
  if (bmi < 25) return { label: "Normal", color: "bg-primary/10 text-primary border-primary/20" };
  if (bmi < 30) return { label: "Overweight", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
  return { label: "Obese", color: "bg-destructive/10 text-destructive border-destructive/20" };
}

const BmiTracker = ({ playerId, playerName, canDelete = false }: BmiTrackerProps) => {
  const { data: records = [], isLoading } = useBmiRecords(playerId);
  const createBmi = useCreateBmiRecord();
  const deleteBmi = useDeleteBmiRecord();

  const [open, setOpen] = useState(false);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [notes, setNotes] = useState("");

  const previewBmi =
    heightCm && weightKg && Number(heightCm) > 0
      ? Number(weightKg) / Math.pow(Number(heightCm) / 100, 2)
      : null;

  const handleSave = async () => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!h || !w || h < 50 || h > 300 || w < 10 || w > 500) {
      toast.error("Please enter valid height (50-300 cm) and weight (10-500 kg)");
      return;
    }
    try {
      await createBmi.mutateAsync({ player_id: playerId, height_cm: h, weight_kg: w, notes: notes || undefined });
      toast.success("BMI record saved");
      setHeightCm("");
      setWeightKg("");
      setNotes("");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save BMI record");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBmi.mutateAsync({ id, playerId });
      toast.success("Record deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const latestRecord = records.length > 0 ? records[records.length - 1] : null;
  const prevRecord = records.length > 1 ? records[records.length - 2] : null;
  const bmiChange = latestRecord && prevRecord ? latestRecord.bmi_value - prevRecord.bmi_value : null;

  const chartData = records.map((r) => ({
    date: format(new Date(r.recorded_at), "MMM d, yy"),
    bmi: r.bmi_value,
    weight: r.weight_kg,
    height: r.height_cm,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border border-border">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">Current BMI</div>
            <div className="font-display text-3xl text-foreground">
              {latestRecord ? latestRecord.bmi_value.toFixed(1) : "—"}
            </div>
            {latestRecord && (
              <Badge variant="outline" className={`mt-2 ${getBmiCategory(latestRecord.bmi_value).color}`}>
                {getBmiCategory(latestRecord.bmi_value).label}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">Change</div>
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl text-foreground">
                {bmiChange !== null ? `${bmiChange > 0 ? "+" : ""}${bmiChange.toFixed(1)}` : "—"}
              </span>
              {bmiChange !== null && (
                bmiChange > 0 ? <TrendingUp className="w-5 h-5 text-amber-500" /> :
                bmiChange < 0 ? <TrendingDown className="w-5 h-5 text-primary" /> :
                <Minus className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">Latest Weight</div>
            <div className="font-display text-3xl text-foreground">
              {latestRecord ? `${latestRecord.weight_kg}` : "—"}
            </div>
            <span className="text-sm text-muted-foreground">kg</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">Total Records</div>
            <div className="font-display text-3xl text-foreground">{records.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* BMI Chart */}
      {chartData.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                BMI Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === "bmi") return [`${value.toFixed(1)} — ${getBmiCategory(value).label}`, "BMI"];
                      return [value, name];
                    }}
                  />
                  <ReferenceLine y={18.5} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "18.5", position: "right", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <ReferenceLine y={25} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "25", position: "right", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Line type="monotone" dataKey="bmi" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-3 text-xs text-muted-foreground">
                <span>Below 18.5 = Underweight</span>
                <span>18.5–25 = Normal</span>
                <span>25–30 = Overweight</span>
                <span>30+ = Obese</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Add Record + History */}
      <Card className="rounded-2xl border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            BMI History {playerName ? `— ${playerName}` : ""}
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record BMI</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Height (cm) *</Label>
                    <Input type="number" placeholder="170" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min={50} max={300} />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg) *</Label>
                    <Input type="number" placeholder="65" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min={10} max={500} />
                  </div>
                </div>

                {previewBmi && (
                  <div className="p-4 bg-muted rounded-xl text-center">
                    <div className="text-sm text-muted-foreground mb-1">Calculated BMI</div>
                    <div className="font-display text-4xl text-foreground">{previewBmi.toFixed(1)}</div>
                    <Badge variant="outline" className={`mt-2 ${getBmiCategory(previewBmi).color}`}>
                      {getBmiCategory(previewBmi).label}
                    </Badge>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea placeholder="Any notes..." value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} />
                </div>

                <Button className="w-full" onClick={handleSave} disabled={createBmi.isPending || !heightCm || !weightKg}>
                  {createBmi.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No BMI records yet. Add the first record to start tracking.
            </div>
          ) : (
            <div className="space-y-2">
              {[...records].reverse().map((record, index) => {
                const cat = getBmiCategory(record.bmi_value);
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-lg text-primary">{record.bmi_value.toFixed(1)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {record.height_cm} cm / {record.weight_kg} kg
                          </span>
                          <Badge variant="outline" className={`text-xs ${cat.color}`}>{cat.label}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(record.recorded_at), "MMM d, yyyy 'at' h:mm a")}
                          {record.recorder?.full_name && ` • by ${record.recorder.full_name}`}
                        </div>
                        {record.notes && (
                          <div className="text-xs text-muted-foreground mt-1">{record.notes}</div>
                        )}
                      </div>
                    </div>
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(record.id)}
                        disabled={deleteBmi.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BmiTracker;
