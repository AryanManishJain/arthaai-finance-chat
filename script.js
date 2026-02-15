body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0f172a;
    color: white;
}
.app {
    max-width: 900px;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.header {
    padding: 20px;
    border-bottom: 1px solid #1e293b;
}
.header h1 {
    margin: 0;
    color: #38bdf8;
}
.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}
.message {
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 12px;
    max-width: 70%;
}
.bot {
    background: #1e293b;
}
.user {
    background: #38bdf8;
    color: black;
    margin-left: auto;
}
.input-area {
    display: flex;
    padding: 15px;
    border-top: 1px solid #1e293b;
}
.input-area input {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
}
.input-area button {
    margin-left: 10px;
    padding: 12px 20px;
    background: #38bdf8;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
}
