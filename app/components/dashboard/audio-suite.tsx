"use client"

import { useState, useRef } from "react"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Upload,
  FileText,
  AudioLines,
  CheckCircle,
  Clock,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Audio Player Widget
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes
  const [volume, setVolume] = useState([75])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="glass-card border-border/50 border-glow-green">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AudioLines className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Now Playing</span>
          </div>
          <Badge className="bg-primary/20 text-primary border-0">Audio Brief</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Track Info */}
        <div className="rounded-lg bg-muted/30 p-4">
          <h4 className="font-medium text-foreground">
            Introduction to Solana Development
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            A comprehensive overview of building on Solana blockchain
          </p>
        </div>

        {/* Waveform Visualization */}
        <div className="flex items-center justify-center gap-0.5 h-12 px-4">
          {Array.from({ length: 40 }).map((_, i) => {
            const isActive = i < (currentTime / duration) * 40
            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isActive ? "bg-primary" : "bg-muted/50"
                } ${isPlaying && isActive ? "animate-pulse" : ""}`}
                style={{
                  height: `${Math.sin(i * 0.5) * 16 + 20}px`,
                }}
              />
            )
          })}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 px-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={setVolume}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Document Upload Dropzone
function DocumentDropzone() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file.name)
    }
  }

  const handleFileUpload = (fileName: string) => {
    setUploadedFile(fileName)
    setIsConverting(true)
    setConversionProgress(0)
    
    // Simulate conversion progress
    const interval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsConverting(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Upload className="h-4 w-4 text-secondary" />
          <span className="text-muted-foreground">Convert Doc to Audio</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(file.name)
          }}
        />
        
        {!uploadedFile ? (
          <div
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-secondary bg-secondary/10"
                : "border-border/50 hover:border-secondary/50 hover:bg-muted/20"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-sm text-foreground">
              Drop your document here
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PDF, DOC, TXT, or MD files supported
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
              <FileText className="h-8 w-8 text-secondary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {uploadedFile}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isConverting ? "Converting..." : "Ready to play"}
                </p>
              </div>
              {isConverting ? (
                <Loader2 className="h-5 w-5 text-secondary animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            
            {isConverting && (
              <div className="space-y-2">
                <Progress value={conversionProgress} className="h-2 bg-muted/30" />
                <p className="text-xs text-center text-muted-foreground">
                  Processing with ElevenLabs... {conversionProgress}%
                </p>
              </div>
            )}
            
            {!isConverting && conversionProgress === 100 && (
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                <Play className="mr-2 h-4 w-4" />
                Play Audio Summary
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Audio Library
const audioBriefs = [
  {
    id: "1",
    title: "Solana Smart Contracts 101",
    duration: "3:24",
    status: "ready",
  },
  {
    id: "2",
    title: "Understanding Token Programs",
    duration: "5:12",
    status: "ready",
  },
  {
    id: "3",
    title: "DeFi Protocol Architecture",
    duration: "4:45",
    status: "processing",
  },
  {
    id: "4",
    title: "NFT Metadata Standards",
    duration: "2:58",
    status: "ready",
  },
]

function AudioLibrary() {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">Audio Library</span>
          <Badge variant="outline" className="text-primary border-primary/30">
            {audioBriefs.filter(a => a.status === "ready").length} Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {audioBriefs.map((brief) => (
          <div
            key={brief.id}
            className="flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-all hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {brief.status === "ready" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Play className="h-3 w-3 text-primary ml-0.5" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{brief.title}</p>
                <p className="text-xs text-muted-foreground">{brief.duration}</p>
              </div>
            </div>
            <Badge
              className={`text-xs ${
                brief.status === "ready"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/50 text-muted-foreground"
              } border-0`}
            >
              {brief.status === "ready" ? "Ready" : "Processing"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function AudioSuite() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <AudioPlayer />
        <div className="space-y-6">
          <DocumentDropzone />
          <AudioLibrary />
        </div>
      </div>
    </div>
  )
}
