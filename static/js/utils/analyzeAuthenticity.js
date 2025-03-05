/**
 * Analyze the authenticity of news compared to verified articles
 */
async function analyzeAuthenticity() {
    const analyzeButton = document.getElementById('analyze-button');
    const analysisResults = document.getElementById('analysis-results');
    
    try {
        // Show loading state
        analyzeButton.disabled = true;
        analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        // Get original news and verified articles
        const originalNews = document.querySelector('.news-content').textContent;
        const verifiedArticles = Array.from(document.querySelectorAll('.news-card')).map(card => ({
            content: card.querySelector('.description').textContent
        }));
        
        // Make API call
        const response = await fetch('/analyze_authenticity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                original_news: originalNews,
                verified_articles: verifiedArticles
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to analyze authenticity');
        }
        
        const result = await response.json();
        
<<<<<<< HEAD
        // Update UI with the analysis results
        if (analysisResults) {
            // Update authenticity score
            const scoreElement = document.getElementById('authenticity-score');
            if (scoreElement) {
                scoreElement.textContent = result.authenticity_score;
            }

            // Update key findings
            const findingsList = document.getElementById('key-findings-list');
            if (findingsList) {
                findingsList.innerHTML = result.key_findings
                    .map(finding => `<li>${finding}</li>`)
                    .join('');
            }

            // Update differences
            const differencesList = document.getElementById('differences-list');
            if (differencesList) {
                differencesList.innerHTML = result.differences
                    .map(diff => `<li>${diff}</li>`)
                    .join('');
            }

            // Update supporting evidence
            const evidenceList = document.getElementById('evidence-list');
            if (evidenceList) {
                evidenceList.innerHTML = result.supporting_evidence
                    .map(evidence => `
                        <li>
                            <blockquote>${evidence.quote}</blockquote>
                            <cite>- ${evidence.source}</cite>
                        </li>
                    `).join('');
            }
            
            // Show the results
            analysisResults.classList.remove('hidden');
=======
        // Update UI with the authenticity score
        if (analysisResults) {
            analysisResults.innerHTML = `
                <div class="authenticity-score">
                    <h3>Authenticity Score</h3>
                    <div class="score-wrapper">
                        <canvas id="score-chart" width="200" height="200"></canvas>
                        <div class="score-number">${(result.score ?? 0).toFixed(1)}/10</div>
                    </div>
                </div>
                <div class="analysis-details">
                    <h3>Analysis Details</h3>
                    <p>${result.explanation}</p>
                </div>
            `;
            
            // Show the results
            analysisResults.classList.remove('hidden');
            
            // Update score chart
            updateScoreChart(result.score);
>>>>>>> 5ff459e (New features Added)
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during authenticity analysis. Please try again.');
    } finally {
        // Reset button state
        if (analyzeButton) {
            analyzeButton.disabled = false;
            analyzeButton.innerHTML = 'Analyze Authenticity';
        }
    }
}

// Export the function
export default analyzeAuthenticity; 