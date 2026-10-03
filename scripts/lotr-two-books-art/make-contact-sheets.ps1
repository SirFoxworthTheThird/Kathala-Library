param([ValidateSet('covers','characters','items','locations')][string]$Kind = 'characters')

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$directory = Join-Path $root "library/lotr-shared-art/generated/$Kind"
if (-not (Test-Path -LiteralPath $directory)) { Write-Output "No $Kind images yet."; exit 0 }
$files = @(Get-ChildItem -LiteralPath $directory -Filter '*.jpg' | Sort-Object Name)
$outDir = Join-Path $PSScriptRoot 'qa/contact-sheets'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$pages = [Math]::Ceiling($files.Count / 15)
for ($page = 0; $page -lt $pages; $page++) {
    $selection = @($files | Select-Object -Skip ($page * 15) -First 15)
    $sheet = [System.Drawing.Bitmap]::new(1200, 900)
    $graphics = [System.Drawing.Graphics]::FromImage($sheet)
    $graphics.Clear([System.Drawing.Color]::FromArgb(248, 243, 232))
    $font = [System.Drawing.Font]::new('Arial', 10)
    try {
        for ($i = 0; $i -lt $selection.Count; $i++) {
            $source = [System.Drawing.Image]::FromFile($selection[$i].FullName)
            try {
                $x = ($i % 5) * 240
                $y = [Math]::Floor($i / 5) * 300
                $ratio = [Math]::Min(232 / $source.Width, 265 / $source.Height)
                $width = [int]($source.Width * $ratio)
                $height = [int]($source.Height * $ratio)
                $graphics.DrawImage($source, ($x + [int]((240-$width)/2)), ($y + [int]((270-$height)/2)), $width, $height)
                $graphics.DrawString($selection[$i].BaseName, $font, [System.Drawing.Brushes]::Black, ($x + 3), ($y + 275))
            } finally { $source.Dispose() }
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
