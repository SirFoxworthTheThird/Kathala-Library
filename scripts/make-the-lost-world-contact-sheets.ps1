Add-Type -AssemblyName System.Drawing

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artRoot = Join-Path $projectRoot 'library\the-lost-world\art\generated'
$outRoot = Join-Path $projectRoot '.tmp\the-lost-world-contact-sheets'
New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

function New-ContactSheet {
    param([string]$Source, [string]$Name, [int]$Columns = 4, [int]$Rows = 3)
    $files = @(Get-ChildItem -File -LiteralPath $Source | Where-Object Extension -in '.png', '.jpg' | Sort-Object Name)
    $perPage = $Columns * $Rows
    $cellWidth = 420
    $cellHeight = 310
    $labelHeight = 34
    $font = [System.Drawing.Font]::new('Arial', 13, [System.Drawing.FontStyle]::Bold)
    for ($start = 0; $start -lt $files.Count; $start += $perPage) {
        $page = [int]($start / $perPage) + 1
        $canvas = [System.Drawing.Bitmap]::new($cellWidth * $Columns, ($cellHeight + $labelHeight) * $Rows)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.Clear([System.Drawing.Color]::FromArgb(28, 30, 34))
            for ($offset = 0; $offset -lt $perPage -and ($start + $offset) -lt $files.Count; $offset++) {
                $file = $files[$start + $offset]
                $column = $offset % $Columns
                $row = [int]($offset / $Columns)
                $x = $column * $cellWidth
                $y = $row * ($cellHeight + $labelHeight)
                $image = [System.Drawing.Image]::FromFile($file.FullName)
                try {
                    $scale = [Math]::Min($cellWidth / $image.Width, $cellHeight / $image.Height)
                    $width = [int]($image.Width * $scale)
                    $height = [int]($image.Height * $scale)
                    $graphics.DrawImage($image, $x + [int](($cellWidth - $width) / 2), $y + [int](($cellHeight - $height) / 2), $width, $height)
                    $graphics.DrawString($file.BaseName, $font, [System.Drawing.Brushes]::White, $x + 8, $y + $cellHeight + 6)
                } finally { $image.Dispose() }
            }
            $target = Join-Path $outRoot ("{0}-{1}.jpg" -f $Name, $page)
            $canvas.Save($target, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            Write-Output $target
        } finally { $graphics.Dispose(); $canvas.Dispose() }
    }
    $font.Dispose()
}

New-ContactSheet -Source (Join-Path $artRoot 'characters') -Name 'characters'
New-ContactSheet -Source (Join-Path $artRoot 'items') -Name 'items'
New-ContactSheet -Source (Join-Path $artRoot 'locations') -Name 'locations'
