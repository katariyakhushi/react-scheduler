import React, { useEffect, useRef, useState } from "react";
import { DayPilot } from "daypilot-pro-react";
import jsPDF from "jspdf";
import { DayPilotScheduler } from "daypilot-pro-react";
import moment from "moment";
import "../scheduler.css";
import apple from "../assets/apple.png";
import android from "../assets/android.png";
import windows from "../assets/windows.png";
import ReactFlagsSelect from "react-flags-select";

const Scheduler = () => {
  // Reference to the scheduler control
  const schedulerRef = useRef();
  // State for orientation of PDF export
  const [orientation, setOrientation] = useState("portrait");
  // State for number of rows per page in PDF export
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // State for visible date in the scheduler
  const [visibleDate, setVisibleDate] = useState(moment());
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);
  // State for selected flag in ReactFlagsSelect
  const [selected, setSelected] = useState("");

  // State for dark mode toggle (alternative approach)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle function for dark mode
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scheduler configuration state
  const [config, setConfig] = useState({
    cellWidth: 77,
    cellHeight: 40,
    rowHeaderWidth: 200,
    rowEmptyHeight: 65,
    rowMinHeight: 65,
    timeHeaders: [
      {
        groupBy: "Day",
        format: "dd MMM",
        headerRenderer: function (start, end, header) {
          var isoWeekNumber = moment(start).isoWeek();
          var dayOfMonth = moment(start).format("D");
          return (
            "Week " +
            isoWeekNumber +
            " (" +
            moment(start).format("MMM") +
            " " +
            dayOfMonth +
            " - " +
            moment(end).format("MMM") +
            " " +
            moment(end).format("D") +
            ")"
          );
        },
        renderer: function (date) {
          return moment(date).format("MMM");
        },
      },
    ],
    days: 365,
    scale: "Day",
    startDate: "2024-01-01",
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt(
        "Create a new event:",
        "Event 1"
      );
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result,
      });
    },
    treeEnabled: true,
  });

  // Event rendering customization
  const onBeforeEventRender = (args) => {
    if (args.data.resource === "B") {
      args.data.backColor = "#ff0000"; // Red for resource B
    } else if (args.data.resource === "D") {
      args.data.backColor = "#0000ff"; // Blue for resource D
    } else {
      args.data.backColor = "#6aa84f"; // Default color
    }
    args.data.barHidden = true;
    args.data.borderColor = "#38761d";
    args.data.fontColor = "#ffffff";
  };

  // Effect to load initial events and resources
  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2024-05-18T00:00:00",
        end: "2024-05-20T00:00:00",
        resource: "B",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2024-05-22T00:00:00",
        end: "2024-05-24T00:00:00",
        resource: "D",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2024-05-26T00:00:00",
        end: "2024-05-28T00:00:00",
        resource: "E",
      },
    ];

    const resources = [
      { name: "Resource A", id: "A" },
      { name: "Resource B", id: "B" },
      { name: "Resource C", id: "C" },
      { name: "Resource D", id: "D" },
      { name: "Resource E", id: "E" },
      { name: "Resource F", id: "F" },
      { name: "Resource G", id: "G" },
      { name: "Resource H", id: "H" },
      { name: "Resource I", id: "I" },
      { name: "Resource J", id: "K" },
      { name: "Resource L", id: "L" },
      { name: "Resource M", id: "M" },
      { name: "Resource N", id: "N" },
      { name: "Resource O", id: "O" },
      { name: "Resource P", id: "P" },
      { name: "Resource Q", id: "Q" },
      { name: "Resource R", id: "R" },
      { name: "Resource S", id: "S" },
      { name: "Resource T", id: "T" },
      { name: "Resource U", id: "U" },
      { name: "Resource V", id: "V" },
      { name: "Resource W", id: "W" },
      { name: "Resource X", id: "X" },
      { name: "Resource Y", id: "Y" },
      { name: "Resource Z", id: "Z" },
    ];

    setConfig((prevConfig) => ({
      ...prevConfig,
      events,
      resources,
    }));
  }, []);

  // Function to get the scheduler control instance
  const getScheduler = () => schedulerRef.current?.control;

  // Function to export the scheduler to PDF
  const exportToPdf = async () => {
    const doc = new jsPDF(orientation, "in", "letter");
    doc.setFontSize(40);
    doc.text(0.5, 1, "Scheduler");

    const rows = getScheduler().rows.all();
    var pages = Math.ceil(rows.length / rowsPerPage);

    for (let i = 0; i < pages; i++) {
      const startId = i * rowsPerPage;
      let endId = i * rowsPerPage + rowsPerPage - 1;
      endId = Math.min(endId, rows.length - 1);

      const image = getScheduler().exportAs("jpeg", {
        area: "range",
        scale: 2,
        resourceFrom: rows[startId].id,
        resourceTo: rows[endId].id,
        quality: 0.95,
      });

      const dimensions = image.dimensions();
      const maxDimensions =
        orientation === "landscape"
          ? { width: 10, height: 20 }
          : { width: 7.5, height: 20 };
      const adjustedDimensions = shrink(dimensions, maxDimensions);

      doc.addImage(
        image.toDataUri(),
        "JPEG",
        0.5,
        1.5,
        adjustedDimensions.width,
        adjustedDimensions.height
      );

      const last = i === pages - 1;
      if (!last) {
        doc.addPage();
      }
    }

    const blob = doc.output("blob");
    DayPilot.Util.downloadBlob(blob, "scheduler.pdf");
  };

  // Function to navigate to the next month
  const handleNext = () => {
    setVisibleDate((prevDate) => prevDate.clone().add(1, "month"));
  };

  // Function to navigate to the previous month
  const handlePrev = () => {
    setVisibleDate((prevDate) => prevDate.clone().subtract(1, "month"));
  };

  // Function to navigate to the current date
  const handleToday = () => {
    setVisibleDate(moment());
  };

  // Utility function to adjust image dimensions for PDF export
  function shrink(dimensions, max) {
    const widthRatio = dimensions.width / max.width;
    const heightRatio = dimensions.height / max.height;

    let ratio = Math.max(widthRatio, heightRatio);
    ratio = Math.max(ratio, 1);

    const width = dimensions.width / ratio;
    const height = dimensions.height / ratio;
    return { width, height };
  }

  return (
    <div className="scheduler-container">
      <div className="scheduler-header">
        <div className="header-left">
          <span>{visibleDate.format("MMMM YYYY")}</span>
        </div>
        <div className="header-right">
          <h2 onClick={handlePrev}>{"<"}</h2>
          <h2 onClick={handleToday} style={{ marginLeft: "10%" }}>
            Today
          </h2>
          <h2 onClick={handleNext} style={{ marginLeft: "10%" }}>
            {">"}
          </h2>
        </div>
      </div>
      <DayPilotScheduler
        {...config}
        ref={schedulerRef}
        onBeforeEventRender={onBeforeEventRender}
        startDate={visibleDate.format("YYYY-MM-DD")}
      />
      <div className="Footer">
        <img src={apple} width={30} height={30} className="apple-image" />
        <img src={android} width={30} height={30} className="android-image" />
        <img src={windows} width={30} height={30} />
        <div className="toggle-container" onClick={handleToggle}>
          <span className={`toggle-text ${!isDarkMode ? 'active' : ''}`}>
            Light
          </span>
          <span className={`toggle-text ${isDarkMode ? 'active' : ''}`}>
            Dark
          </span>
        </div>
        <div>
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
            className="Flag-Select"
          />
          {selected}
        </div>
        <div class="button-container">
          <button class="button-right">Go Back to Demos</button>
        </div>
      </div>
    </div>
  );
};
export default Scheduler;
