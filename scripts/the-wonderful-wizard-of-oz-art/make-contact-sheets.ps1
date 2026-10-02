param([string]$Kind = 'characters')

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$files = @(Get-ChildItem -LiteralPath (Join-Path $root "library/the-wonderful-wizard-of-oz/art/generated/$Kind") -Filter '*.jpg' | Sort-Object Name)
$outDir = Join-Path $PSScriptRoot 'qa/contact-sheets'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$pages = [Math]::Ceiling($files.Count / 15)
for ($page = 0; $page -lt $pages; $page++) {
    $selection = @($files | Select-Object -Skip ($page * 15) -First 15)
    $sheet = New-Object System.Drawing.Bitmap(1200, 900)
    $graphics = [System.Drawing.Graphics]::FromImage($sheet)
    $graphics.Clear([System.Drawing.Color]::White)
    $font = New-Object System.Drawing.Font('Arial', 11)
    try {
        for ($i = 0; $i -lt $selection.Count; $i++) {
            $image = [System.Drawing.Image]::FromFile($selection[$i].FullName)
            try {
                $x = ($i % 5) * 240
                $y = [Math]::Floor($i / 5) * 300
                $graphics.DrawImage($image, $x, $y, 240, 270)
                $graphics.DrawString($selection[$i].BaseName, $font, [System.Drawing.Brushes]::Black, ($x + 3), ($y + 275))
            } finally { $image.Dispose() }
        }
        $target = Join-Path $outDir "$Kind-contact-$($page + 1).jpg"
        $sheet.Save($target, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        Write-Output $target
    } finally {
        $font.Dispose()
        $graphics.Dispose()
        $sheet.Dispose()
    }
}
