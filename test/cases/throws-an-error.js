`Hello`;

// A few lines later:

try {
    /* comment */ throw new Error("boo!");
} catch (e) {
    console.log(e.stack);
}
