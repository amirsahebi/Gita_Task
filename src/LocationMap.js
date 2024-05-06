import React from "react";
import "./App.css";
import Mapir from "mapir-react-component";

const Map = Mapir.setToken({
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "x-api-key": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAyZjk5ZGQ2NmYyMzFiN2FjODQwYTdiYTM0ZWU3NzUwOGExYTRmMmFjZjc0ZDg2MWU1NmU1MTk3MzBkZDliOWUwYTFiNDIyNzliOTk1ODJmIn0.eyJhdWQiOiIyNzIzNyIsImp0aSI6IjAyZjk5ZGQ2NmYyMzFiN2FjODQwYTdiYTM0ZWU3NzUwOGExYTRmMmFjZjc0ZDg2MWU1NmU1MTk3MzBkZDliOWUwYTFiNDIyNzliOTk1ODJmIiwiaWF0IjoxNzE0OTk5Mjk4LCJuYmYiOjE3MTQ5OTkyOTgsImV4cCI6MTcxNzU5MTI5OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.mThuWhE-WxDHzkRzswWEMnqyAlhRYliUrY7knGnB6E0qCfK0S2aYEGhDyMn3AGWDF4FdktQBkwcWRvYnEDVEotRyyvK88DMxTpLHNLfyOb1QrbS6E-WSf7ZKaoQ2CuHS97LyZ9BTGKSJlkPSiF4_ld9DZs9JpihrqLPKKySO2TyK6DBpIDz_s_e-rsaMKg3mh97DJrmTtXJFCNffbwQ19154kQ4vcXAeZOy_qbmedpED0GjBm-hrkdwYQnbCeh7TBShiNB8dzJ4RmI95zyEKF4KoFaJRYuGAlR5yMS-oGSCdTDlHUEyfUjrO3SaFud2DvKx6tb6-qN3k-DIdvBjL3g', //Mapir api key
        "Mapir-SDK": "reactjs"
      }
    };
  }
});
const App = () => {
  return (
    <div className="App">
      <Mapir trackResize={true} center={[51.42047, 35.729054]} Map={Map}>
        <Mapir.Marker coordinates={[51.41, 35.72]} anchor="bottom" />
      </Mapir>
    </div>
  );
};

export default App;