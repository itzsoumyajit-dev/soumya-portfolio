import DyeWhorl from "./ui/dye-whorl";

export default function DyeWhorlDemo() {
  return (
    <div className="h-screen w-full">
      <DyeWhorl className="h-full w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center px-6">
          <span className="text-xs font-mono tracking-widest text-muted-foreground">
            NS-UI / DYE-WHORL
          </span>
          <h1 className="text-4xl font-semibold text-foreground">
            Ink in still water
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Drag through the tank to stir the plumes, or press to drop a fresh
            bead.
          </p>
          <button className="mt-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Read the docs
          </button>
        </div>
      </DyeWhorl>
    </div>
  );
}
