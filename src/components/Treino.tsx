import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faChevronLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

export default function TreinoTable() {
  const [tables, setTables] = useState([
    {
      nome: "Treino A",
      rows: [{ exercicio: "", series: "", reps: "", obs: "" }],
    },
  ]);

  const addTable = () => {
    setTables([
      ...tables,
      {
        nome: "Novo Treino",
        rows: [{ exercicio: "", series: "", reps: "", obs: "" }],
      },
    ]);
  };

  const removeTable = (tableIndex: number) => {
    if (tables.length === 1) return; // não remove se só tiver 1
    setTables(tables.filter((_, index) => index !== tableIndex));
  };

  const addRow = (tableIndex: number) => {
    const newTables = [...tables];
    newTables[tableIndex].rows.push({
      exercicio: "",
      series: "",
      reps: "",
      obs: "",
    });
    setTables(newTables);
  };

  const removeRow = (tableIndex: number, rowIndex: number) => {
    const newTables = [...tables];
    newTables[tableIndex].rows = newTables[tableIndex].rows.filter(
      (_, index) => index !== rowIndex
    );
    setTables(newTables);
  };

  const updateTableName = (tableIndex: number, newName: string) => {
    const newTables = [...tables];
    newTables[tableIndex].nome = newName;
    setTables(newTables);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let startY = 20;

    tables.forEach((table) => {
      doc.setFontSize(16);
      doc.text(table.nome, 14, startY);

      const columns = ["Exercício", "Séries", "Reps", "Obs"];
      const rows = table.rows.map((row) => [
        row.exercicio,
        row.series,
        row.reps,
        row.obs,
      ]);

      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: startY + 10,
        headStyles: {
          fillColor: [192, 192, 192],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        bodyStyles: {
          textColor: [0, 0, 0],
        },
      });

      startY = ((doc as any).lastAutoTable?.finalY ?? startY) + 20;
    });

    doc.save("meuTreino.pdf");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <Link to="/">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1 className="text-3xl md:text-4xl text-[#111111] font-bold">
          Monte seu treino
        </h1>
        <button
          className="bg-[#111111] text-white cursor-pointer px-4 py-2 border-2 border-transparent rounded hover:bg-transparent hover:border-2 hover:border-[#111111] hover:text-[#111111] transition"
          onClick={exportPDF}
        >
          <FontAwesomeIcon icon={faPrint} /> Exportar PDF
        </button>
      </div>

      {tables.map((table, tIndex) => (
        <div
          key={tIndex}
          className="p-4 rounded-lg shadow-xl space-y-4 bg-[#ECECEC]"
        >
          {/* Nome da tabela */}
          <input
            type="text"
            value={table.nome}
            onChange={(e) => updateTableName(tIndex, e.target.value)}
            className="text-xl font-semibold p-1 w-full focus:outline-none"
          />

          {/* TABLE DESKTOP */}
          <div className="overflow-x-auto">
            <table className="hidden md:table w-full">
              <thead>
                <tr>
                  {["Exercício", "Séries", "Reps", "Obs"].map((col) => (
                    <th
                      key={col}
                      className="bg-[#C0C0C0] border-[#CCCCCC] border p-2 text-left"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIndex) => (
                  <tr key={rIndex}>
                    {["exercicio", "series", "reps", "obs"].map((key) => (
                      <td key={key} className="border-[#CCCCCC] border p-2">
                        <input
                          type={key === "series" ? "number" : "text"}
                          placeholder={
                            key === "exercicio"
                              ? "Ex: Supino"
                              : key === "series"
                              ? "3"
                              : key === "reps"
                              ? "8-12"
                              : "Observacao"
                          }
                          value={row[key as keyof typeof row]}
                          onChange={(e) => {
                            const newTables = [...tables];
                            newTables[tIndex].rows[rIndex][
                              key as keyof typeof row
                            ] = e.target.value;
                            setTables(newTables);
                          }}
                          className="w-full p-1 focus:outline-none text-[#111111]"
                        />
                      </td>
                    ))}
                    <td className="p-2 flex justify-center">
                      <button
                        onClick={() => removeRow(tIndex, rIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CARDS MOBILE */}
            <div className="md:hidden space-y-4">
              {table.rows.map((row, rIndex) => (
                <div
                  key={rIndex}
                  className="border rounded-lg p-3 shadow-md bg-white space-y-2"
                >
                  {["exercicio", "series", "reps", "obs"].map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center gap-2"
                    >
                      <span className="font-semibold text-gray-700 capitalize">
                        {key}:
                      </span>
                      <input
                        type={key === "series" ? "number" : "text"}
                        placeholder={
                          key === "exercicio"
                            ? "Ex: Supino"
                            : key === "series"
                            ? "3"
                            : key === "reps"
                            ? "8-12"
                            : "Observacao"
                        }
                        value={row[key as keyof typeof row]}
                        onChange={(e) => {
                          const newTables = [...tables];
                          newTables[tIndex].rows[rIndex][
                            key as keyof typeof row
                          ] = e.target.value;
                          setTables(newTables);
                        }}
                        className="w-[60%] p-1 border border-gray-300 rounded focus:outline-none"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeRow(tIndex, rIndex)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <button
              onClick={() => addRow(tIndex)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
            >
              + Adicionar linha
            </button>
            {tables.length > 1 && (
              <button
                onClick={() => removeTable(tIndex)}
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Remover o treino
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Adicionar nova tabela */}
      <button
        onClick={addTable}
        className="w-full border-2 border-dashed border-gray-500 p-6 rounded-lg text-gray-600 hover:bg-[#999999] cursor-pointer"
      >
        + Adicionar novo treino
      </button>
    </div>
  );
}
