import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Play, Square, Camera, CheckCircle, AlertCircle } from "lucide-react";

const FormChecker = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const startFormCheck = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Animate status text
    if (statusRef.current) {
      gsap.to(statusRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });
    }

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const stopFormCheck = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Form Checker
          </h1>
          <p className="text-muted-foreground">
            AI-powered computer vision to analyze your exercise form (Mock UI)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div
                  ref={videoRef}
                  className="relative aspect-video bg-black/50 rounded-xl overflow-hidden mb-4"
                >
                  {/* Placeholder for webcam */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isAnalyzing && !analysisComplete && (
                      <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Webcam preview will appear here
                        </p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div
                        ref={statusRef}
                        className="text-center space-y-4"
                        style={{ opacity: 0, transform: "translateY(20px)" }}
                      >
                        <div className="w-20 h-20 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <p className="text-xl font-semibold gradient-text">
                          Analyzing form...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Detecting key body points and movement patterns
                        </p>
                      </div>
                    )}

                    {analysisComplete && (
                      <div className="text-center space-y-4 animate-fade-in">
                        <CheckCircle className="w-20 h-20 mx-auto text-green-400" />
                        <p className="text-xl font-semibold text-green-400">
                          Analysis Complete!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check the feedback panel for detailed results
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Overlay indicators when analyzing */}
                  {isAnalyzing && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm">Recording</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  {!isAnalyzing ? (
                    <Button
                      size="lg"
                      onClick={startFormCheck}
                      className="bg-gradient-neon hover:shadow-glow transition-all"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Form Check
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={stopFormCheck}
                      variant="destructive"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Stop Analysis
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Panel */}
          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!analysisComplete ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Start form check to receive feedback</p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-400 mb-1">
                            Good Back Position
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Your spine is properly aligned during the movement
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-yellow-400 mb-1">
                            Knee Tracking
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Try to keep knees aligned over toes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-400 mb-1">
                            Depth Achieved
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Excellent depth on your squat
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>How it Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  1. Position yourself in frame doing an exercise
                </p>
                <p>
                  2. Click "Start Form Check" to begin recording
                </p>
                <p>
                  3. AI analyzes your movement patterns in real-time
                </p>
                <p>
                  4. Receive instant feedback on form and technique
                </p>
                <p className="mt-4 pt-4 border-t border-white/10">
                  💡 Note: This is a mock UI. Computer vision integration requires
                  backend setup with models like MediaPipe or OpenPose.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormChecker;
