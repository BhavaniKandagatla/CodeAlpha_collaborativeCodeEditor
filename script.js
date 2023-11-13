const socket = io('http://localhost:3000'); // Replace with your server URL

const editor = ace.edit('editor');
editor.setTheme('ace/theme/twilight');
editor.session.setMode('ace/mode/javascript');

// Function to handle changes in the editor
editor.getSession().on('change', function(delta) {
    const data = {
        delta: delta,
        code: editor.getValue()
    };
    socket.emit('code-change', data);
});

// Function to receive and apply changes from other users
socket.on('receive-changes', function(data) {
    editor.getSession().getDocument().applyDeltas([data.delta]);
    if (data.code !== editor.getValue()) {
        editor.setValue(data.code);
    }
});
