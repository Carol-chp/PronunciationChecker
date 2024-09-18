document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const word = document.getElementById('word-input').value;

    if (word.trim() === '') {
        alert('Please enter a word.');
        return;
    }

    // Call the API
    fetch(`https://tv99vdhm1m.execute-api.us-east-1.amazonaws.com/dev/pronunciation?word=${encodeURIComponent(word)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the data.');
        });
});

function displayResult(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpia los resultados anteriores

    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = data.sound;

    const ipa = document.createElement('p');
    ipa.textContent = `Pronunciation (IPA): ${data.pronunciation_ipa}`;

    resultItem.appendChild(audio);
    resultItem.appendChild(ipa);

    resultsDiv.appendChild(resultItem);
}
