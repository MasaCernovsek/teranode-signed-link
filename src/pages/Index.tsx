import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusBadge from "@/components/StatusBadge";
import NewProjectModal from "@/components/NewProjectModal";
import { projects } from "@/data/dummyData";
import { FileText, Users, Calendar, Plus, Mail, Clock, CheckCircle2 } from "lucide-react";

const Index = () => {
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const navigate = useNavigate();

  const inboxCount = 1;
  const waitingCount = 3;
  const completedCount = 23;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-secondary">Dashboard</span>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AH</span>
            </div>
            <span className="text-sm font-medium text-foreground">Apex Homes Ltd</span>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 max-w-6xl">
          {/* Welcome */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome to Sign</h1>
              <p className="text-sm text-muted-foreground mt-1">
                You're viewing <span className="font-semibold text-foreground">Apex Homes Ltd</span> Workspace
              </p>
            </div>
            <Button onClick={() => setNewProjectOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="border-l-4 border-l-warning">
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-5 w-5 text-warning" />
                    <span className="text-sm font-semibold text-foreground">Inbox</span>
                    <span className="h-2 w-2 rounded-full bg-warning" />
                  </div>
                  <p className="text-xs text-secondary cursor-pointer hover:underline">View {inboxCount} new envelope</p>
                </div>
                <span className="text-3xl font-bold text-foreground">{inboxCount}</span>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-semibold text-foreground">Waiting for Others</span>
                  </div>
                  <p className="text-xs text-secondary cursor-pointer hover:underline">View {waitingCount} sent envelopes</p>
                </div>
                <span className="text-3xl font-bold text-foreground">{waitingCount}</span>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-foreground">Completed</span>
                  </div>
                  <p className="text-xs text-secondary cursor-pointer hover:underline">1 recently completed</p>
                </div>
                <span className="text-3xl font-bold text-foreground">{completedCount}</span>
              </CardContent>
            </Card>
          </div>

          {/* Project Folders */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Project Folders</h2>
            <p className="text-sm text-muted-foreground">
              Blockchain-linked envelopes for tamper-proof project records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-md transition-shadow border hover:border-primary/30"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-foreground leading-tight pr-2">
                      {project.name}
                    </h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      {project.documentCount} documents
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {project.partyCount} parties
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.lastActivity}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <NewProjectModal open={newProjectOpen} onOpenChange={setNewProjectOpen} />
    </div>
  );
};

export default Index;
