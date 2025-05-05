// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [command, setCommand] = useState('');
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);
  const [logFiles, setLogfiles] = useState([]);

  const runCommand = async () => {
    try {
      setLoading(true);
      setLog('');
      const res = await axios.post('/api/process', { command });
      const { logFile } = res.data;
      const logRes = await axios.get(`/api/process/logs/${logFile}`);
      getLogList();
      setLog(logRes.data);
    } catch (err) {
      setLog(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getLogList = async () => {
    try {
      const res = await axios.get('/api/process/logList');
      setLogfiles(res.data);
    } catch (err) {
      setLog(`Error: ${err.response?.data?.error || err.message}`);
    }
  }

  const deleteFile = (filename) => async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/process/logs/${filename}`);
      if (res.status === 200) {
          setLog('File deleted successfully');
      }
      getLogList();
    } catch (err) {
      setLog(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  }

  // const showOneLog = async (filename) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`/api/process/logs/${filename}`);
  //     setLog(res.data);
  //   } catch (err) {
  //     setLog(`Error: ${err.response?.data?.error || err.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-xl font-bold mb-4">Run Shell Command</h1>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter shell command (e.g., ls -la)"
        />
        <button
          onClick={runCommand}
          disabled={loading || !command}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run Command'}
        </button>
        <pre className="bg-gray-800 text-white p-4 mt-4 rounded h-64 overflow-y-auto">
          {log}
        </pre>
      </div>
      <div>
        <h1>List of log files</h1>
        <button
          onClick={getLogList}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Refresh'}
        </button>
        <ul>
          {logFiles.map((f) => (
            <li key={f}>
              {f} -- 
              <button
                onClick={deleteFile(f)}
                disabled={loading}
              >
                {loading ? 'Running...' : 'Delete'}
              </button>
              {/* -- 
              <button
                onClick={showOneLog(f)}
                disabled={loading}
              >
                {loading ? 'Running...' : 'Show'}
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

