import SampleSplitter from "./SampleSplitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";
import '../styles/IdeClone.css'
import UserData from "./user/UserData";
import TotalCount from "./TotalCount";

const IdeClone = (): JSX.Element => {

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50
  });

  return (
    <div className="flex flex-column h-screen bg-dark font-mono color-white overflow-hidden">
      <div className="flex grow">
        <div
          className={cn('shrink-0 contents', isFileDragging && 'dragging')}
          style={{ width: fileW }}
        >
          <TotalCount />
        </div>
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className="flex grow">
          <div className="grow bg-white contents"><UserData /></div>
        </div>
      </div>
      <SampleSplitter dir="horizontal" isDragging={isTerminalDragging} {...terminalDragBarProps} />
      <div
        className={cn('shrink-0 bg-darker contents', isTerminalDragging && 'dragging')}
        style={{ height: terminalH }}
      >
        Terminal
      </div>
    </div>
  );
};

export default IdeClone;
