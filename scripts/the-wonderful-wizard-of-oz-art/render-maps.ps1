$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$directory = Join-Path $repo 'library/the-wonderful-wizard-of-oz/maps/generated'
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $browser)) { throw 'Headless Chrome is needed to rasterize the SVG maps.' }
Add-Type -AssemblyName System.Drawing
foreach ($name in @('oz','emerald-city','palace','yellow-castle','china-country','glinda-castle')) {
    $svg = Join-Path $directory "$name.svg"
    $png = Join-Path $directory "$name.png"
    $image = if ($name -eq 'yellow-castle') { '2048,1117' } else { '1024,559' }
    $uri = 'file:///' + ($svg.Replace('\', '/'))
    $process = Start-Process -FilePath $browser -WindowStyle Hidden -PassThru -Wait -ArgumentList @('--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars',"--screenshot=$png","--window-size=$image",$uri)
    if ($process.ExitCode -ne 0) { throw "Chrome failed rendering $name ($($process.ExitCode))" }
    if (-not (Test-Path -LiteralPath $png)) { throw "Map render failed: $name" }
    $bitmap = [System.Drawing.Image]::FromFile($png)
    try {
        $expected = $image.Split(',')
        if ($bitmap.Width -ne [int]$expected[0] -or $bitmap.Height -ne [int]$expected[1]) { throw "Map size mismatch: $name" }
    } finally { $bitmap.Dispose() }
    Write-Output "Rendered $name.png ($image)"
}
