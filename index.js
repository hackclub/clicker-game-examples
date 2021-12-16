import { render, html, svg } from 'https://unpkg.com/uhtml?module';

const examples = [
  {
  	title: "COUNT",
    text: `
<p id="count">0</p>
<span 
	id="button" 
	style="
		background-color: grey;  
		border-size: 10px;"> 
	Click Me!
</span>

<script>
	const button = document.getElementById("button");

	const count = document.getElementById("count");

	let num = 0;

	function counter() {
		num++;
		count.innerText = num;
	}

	button.addEventListener("click", counter);
</script>
    `
  },
  {
  	title: "REPOSITION",
    text: `
<span 
	id="block" 
	style="
		position: absolute; 
		top: 50%; 
		left: 50%; 
		background-color: red; 
		width: 50px; 
		height: 50px;"> 
</span>

<script>
	const block = document.getElementById("block");

	function relocate() {
		let x = 5 + Math.random() * 90;
		let y = 15 + Math.random() * 45;
		block.style.left = x + "%";
		block.style.top = y + "%";
	}

	block.addEventListener("click", relocate);
</script>
    `
  },
  {
  	title: "RESIZE",
    text: `
<span 
	id="block" 
	style="
		position: absolute; 
		top: 50%; 
		left: 50%; 
		background-color: red; 
		width: 50px; 
		height: 50px;"> 
</span>

<script>
	const block = document.getElementById("block");

	function resize() {
		let size = 25 + Math.random() * 100;
		block.style.transform = \`scale(\${size}%, \${size}%\`;
	}

	block.addEventListener("click", resize);
</script>
    `
  },
  {
  	title: "TIMER",
    text: `
<p id="timer">2000</p>
<span 
	id="button" 
	style="
		background-color: grey;  
		border-size: 10px;"> 
	Click Me!
</span>

<script>
	const button = document.getElementById("button");

	const timer = document.getElementById("timer");

	let time = 2000;

	function timerfunc() {
		time--;
		timer.innerText = time;
		if(time == 0) {
			time = 2000;
		}
	}

	setInterval(timerfunc, 0.1);

	function reset() {
		time = 2000;
	}

	button.addEventListener("click", reset);
</script>
    `
  }
]

const STATE = {
	examples,
	searchTerm: "",
}

const view = (state) => html`	
	<div class="search-box">
		<input @input=${x => { state.searchTerm = x.target.value; r(); }}></input>
	</div>
	<div class="text">
		Let's try to make this style of&nbsp;<a target="_blank" href="https://whackamole-demo.sohamb117.repl.co/">clicker game</a>.
	</div>
	<div class="text">
		Get started by going to&nbsp;<a target="_blank" href="https://hackclub.github.io/live-editor/">live editor</a>&nbsp;under "Examples" -> "Basic HTML Starter".
	</div>
	<div class="examples">${drawExamples(state)}</div>
`

const drawExample = (x, i) => {
	const runSnippet = (e) => {
		const iframe = e.target.previousElementSibling.querySelector("iframe");
		iframe.srcdoc = x.text;
	}

	return html.for(x)`
		<div class="example">
			<div class="example-title">${x.title}</div>
			<pre class="example-code"><code class="language-js">${x.text}</code></pre>
			<div class="example-view">
				<iframe class="example-iframe"></iframe>
			</div>
			<button class="draw-trigger" @click=${runSnippet}>run</button>
		</div>
	`
}

const filterSearchTerm = (x, searchTerm) => {
	const text = `${x.title} ${x.text}`.toLowerCase();
	return searchTerm === "" || text.includes(searchTerm.toLowerCase());
}

const drawExamples = state => state.examples.filter(x => filterSearchTerm(x, state.searchTerm)).map(drawExample);

const r = () => render(document.body, view(STATE));

function runSnippets() {
	const views = document.querySelectorAll(".example-view");
	for (let i = 0; i < views.length; i++) {
		const c = views[i].nextElementSibling;
		c.click();
	}
}	

r();
runSnippets();