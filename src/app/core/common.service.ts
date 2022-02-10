import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  COLOR1: any = "#1561C0";
  COLOR3: any = "#0D9CD6";
  COLOR2: any = "#0CC7CC";

  loadC = {
    "en-US": {
      daterangepicker: {
        today: "Hoy",
        startLabel: "Inicial",
        endLabel: "Final",
        applyText: "Aplicar",
        cancelText: "Cancelar",
        selectedDays: "Días seleccionados",
        days: "Días",
        customRange: "Personalizado",
      },
    },
  };

  horas = [
    "0:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  minutos = ["10", "20", "30", "40", "50", "60"];

  monthNameShortU = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  monthNameShortL = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  monthName = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  ayer = new Date(new Date().setDate(new Date().getDate() - 1));
  antier = new Date(new Date().setDate(new Date().getDate() - 2));

  dateRangePickerValue: Date[];
  range1: Date = this.ayer;
  range2: Date = this.ayer;
  arrayCada10m = [];
  constructor() {
    this.dateRangePickerValue = [this.range1, this.range2];
    this.horas.forEach((h) => {
      this.minutos.forEach((m) => {
        this.arrayCada10m.push(h.split(":")[0] + ":" + m);
      });
    });
  }

  getTable(nicho: string, planta: string): any {
    const temp = JSON.parse(localStorage.getItem("menu")).filter(
      (x) => x.nombre === nicho
    )[0].menu;
    return temp.filter((x) => x.plant === planta)[0].table;
  }
  uniqBy(dato: any[], prop: string) {
    const lista = [];
    dato.forEach((x) => {
      if (!lista.includes(x[prop])) lista.push(x[prop]);
    });
    return lista;
  }
  SysMonProcess(jdat: any, isPG: boolean): any {
    const data = { total: 0, data: [], list: [] };

    for (let i = 0; i <= jdat.history.length - 1; i++) {
      for (let j = 0; j < jdat.history[i].data.list.length; j++) {
        // frequent
        data.total++;
        const indxtmp = data.data.findIndex(
          (x) =>
            x.proc === jdat.history[i].data.list[j].proc &&
            x.station === jdat.history[i].data.list[j].station
        );
        if (indxtmp >= 0) {
          data.data[indxtmp].frecuency++;
          data.data[indxtmp].total++;
        } else {
          const tmpjson = {
            proc: jdat.history[i].data.list[j].proc,
            station: jdat.history[i].data.list[j].station,
            text: jdat.history[i].data.list[j].text,
            frecuency: 1,
            total: 1,
            percent: 0,
          };
          data.data.push(tmpjson);
        }
        // lista
        const tmpjson2 = {
          date: jdat.history[i].data.list[j].date,
          proc: jdat.history[i].data.list[j].proc,
          station: jdat.history[i].data.list[j].station,
          text: jdat.history[i].data.list[j].text,
        };
        data.list.push(tmpjson2);
      }
    }

    for (let i = 0; i < data.data.length; i++) {
      data.data[i].percent = (data.data[i].total / data.total) * 100;
    }

    return data;
  }

  public titleCase(string): string {
    const sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
      try {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      } catch {
        sentence[i] = sentence[i][0] + sentence[i].slice(1);
      }
    }

    return sentence.join(" ");
  }
  format(date, time) {
    if (time)
      return (
        date.getFullYear() +
        "-" +
        this.cnumber(date.getMonth() + 1) +
        "-" +
        this.cnumber(date.getDate()) +
        " " +
        this.cnumber(date.getHours()) +
        ":" +
        this.cnumber(date.getMinutes()) +
        ":" +
        this.cnumber(date.getSeconds())
      );
    else
      return (
        date.getFullYear() +
        "-" +
        this.cnumber(date.getMonth() + 1) +
        "-" +
        this.cnumber(date.getDate())
      );
  }
  cnumber(month) {
    if (month < 10) return "0" + month.toString();
    else return month;
  }
  Date2String(dateiso) {
    const minyear = dateiso.getFullYear();
    const minmonth =
      dateiso.getMonth() + 1 > 9
        ? dateiso.getMonth() + 1
        : "0" + (dateiso.getMonth() + 1);
    const minday =
      dateiso.getDate() > 9 ? dateiso.getDate() : "0" + dateiso.getDate();
    return minyear + "-" + minmonth + "-" + minday;
  }

  public deltaDate(input, days, months, years) {
    return new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(
          input.getFullYear() + years,
          input.getMonth() + months + 1,
          0
        ).getDate()
      )
    );
  }

  getRanges(date) {
    const ayer = date;
    const antier = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate() - 1
    );
    return [
      {
        value: [ayer, ayer],
        label: "Ayer",
      },
      /* {
        value: [antier, antier],
        label: 'Antier'
      }, */
      {
        value: [
          new Date(ayer.getFullYear(), ayer.getMonth(), ayer.getDate() - 7),
          ayer,
        ],
        label: "última semana",
      },
      {
        value: [new Date(ayer.getFullYear(), ayer.getMonth(), 1), ayer],
        label: "Este mes",
      },
      {
        value: [
          new Date(ayer.getFullYear(), ayer.getMonth(), ayer.getDate() - 30),
          ayer,
        ],
        label: "últimos 30 días",
      },

      {
        value: [
          new Date(ayer.getFullYear(), ayer.getMonth(), ayer.getDate() - 180),
          ayer,
        ],
        label: "Últimos 6 meses",
      },
    ];
  }

  getRangesPersonalizados() {
    const trim1 = new Date(new Date().getFullYear(), 0, 1);
    const trim2 = new Date(new Date().getFullYear(), 3, 1);
    const trim3 = new Date(new Date().getFullYear(), 6, 1);
    const trim4 = new Date(new Date().getFullYear(), 9, 1);
    const arrRet = [
      {
        value: [
          trim1,
          new Date(
            new Date(trim1).getFullYear(),
            new Date(trim1).getMonth() + 3,
            0
          ),
        ],
        label: "Trim. 1",
      },
      {
        value: [
          trim2,
          new Date(
            new Date(trim2).getFullYear(),
            new Date(trim2).getMonth() + 3,
            0
          ),
        ],
        label: "Trim. 2",
      },
      {
        value: [
          trim3,
          new Date(
            new Date(trim3).getFullYear(),
            new Date(trim3).getMonth() + 3,
            0
          ),
        ],
        label: "Trim. 3",
      },
      {
        value: [
          trim4,
          new Date(
            new Date(trim4).getFullYear(),
            new Date(trim4).getMonth() + 3,
            0
          ),
        ],
        label: "Trim. 4",
      },
    ];
    return arrRet;
  }
  public getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday

    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return week number
    return weekNo;
  }

  DateRangeName(dateini: string, dateend: string, midate: string): string {
    const ayer = this.getUTCdate(new Date(midate));
    const antier = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate() - 1
    );
    const week = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate() - 7
    );
    const ds30 = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate() - 30
    );
    const ds6m = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate() - 180
    );
    const mes = new Date(ayer.getFullYear(), ayer.getMonth(), 1);
    const strlst = this.Date2String(ayer);
    const strbfr = this.Date2String(antier);
    const strwek = this.Date2String(week);
    const strd30 = this.Date2String(ds30);
    const str6m = this.Date2String(ds6m);
    const strmes = this.Date2String(mes);

    if (dateini == strlst && dateend == strlst) return "AYER";
    //if (dateini == strbfr && dateend == strbfr) return 'ANTIER';
    if (dateend == strlst) {
      /* if (dateini == strnow)
        return 'HOY'; */
      if (dateini == strwek) return "ÚLTIMA SEMANA";
      if (dateini == strd30) return "ÚLTIMOS 30 DÍAS";
      if (dateini == str6m) return "ÚLTIMOS 6 MESES";
      if (dateini == strmes) return "ESTE MES";
      /* if (dateini == stryer)
        return 'ÚLTIMO AÑO'; */
    }
    return "PERSONALIZADA";
  }

  getUTCdate(date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }

  sumArrayBy(array, prop) {
    const res = new Array(8);
    res.fill(-1);
    array.forEach((x) => {
      let j = x[prop].length;
      for (let i = 7; i >= 0; i--) {
        if (j > 0) {
          if (res[i] == -1) res[i] = 0;
          res[i] += x[prop][j - 1];
          j--;
        }
      }
    });

    return res;
  }
  sumBy(array, prop) {
    let res = 0;
    array.forEach((x) => {
      res += x[prop];
    });
    return res;
  }
  filterArray(array) {
    while (array.length > 8) {
      array.shift();
    }
    return array;
  }
  getDays(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const diff = end - start;
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }
}
